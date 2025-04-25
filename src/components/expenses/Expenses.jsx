"use client"

import { useEffect, useState } from "react"
import "./Expenses.css"
import ExpenseForm from "./ExpenseForm"
import { useDispatch, useSelector } from "react-redux" // it is for redux
import {
  createExpenseAsync,
  deleteExpenseAsync,
  getExpenseAsync,
  updateExpenseAsync,
} from "../../store/slice/ExpenseSlice" // importing actions from ExpenseSlice

import { toggleDarkMode } from "../../store/slice/ThemeSlice" // importing actions from ThemeSlice

import { CSVLink } from "react-csv" // for csv import

const Expenses = () => {
  // Redux
  const dispatch = useDispatch()
  const expenseRedux = useSelector((state) => state.expenses)
  const themeRedux = useSelector((state) => state.theme.isDarkMode) // getting theme from Redux store

  const [showForm, setShowForm] = useState(false) // for expense form visibility
  const [isDeleting, setIsDeleting] = useState(false) // Track delete operation separately

  const [expenseInput, setExpenseInput] = useState({
    price: "",
    expenseTitle: "",
    category: "",
  })

  // converting object to array for easier manipulation
  const expensesArray = Object.keys((expenseRedux && expenseRedux?.data) || {}).map((key) => ({
    id: key, // Including the unique identifier key as 'id'
    ...expenseRedux.data[key],
  }))

  const totalAmount = expensesArray.reduce((sum, expense) => sum + Number(expense.price), 0)

  // for expenses form input change event handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setExpenseInput((prevState) => ({ ...prevState, [name]: value }))
  }

  // Fixed form submission to properly handle updates
  const handleFormSubmission = async (e) => {
    e.preventDefault()

    // Condition for checking if expense id is present or not
    // If id is present, it means we are updating the expense
    if (expenseInput.id) {
      try {
        console.log("Updating expense with ID:", expenseInput.id, expenseInput)

        // Make sure we're passing the complete expense object with the ID
        await dispatch(
          updateExpenseAsync({
            expenseInput: {
              id: expenseInput.id,
              price: expenseInput.price,
              expenseTitle: expenseInput.expenseTitle,
              category: expenseInput.category,
            },
          }),
        )

        // Refresh the list after update
        await dispatch(getExpenseAsync())
      } catch (error) {
        console.error("Error Updating Expense:", error)
      }
    }
    // If id is not present, it means we are adding a new expense
    else {
      try {
        await dispatch(createExpenseAsync({ expenseInput }))
        await dispatch(getExpenseAsync()) // Fetching the expenses list

        // Update cart count in localStorage
        const currentCount = Number.parseInt(localStorage.getItem("cartCount") || "0")
        localStorage.setItem("cartCount", (currentCount + 1).toString())
      } catch (error) {
        console.error("Error Adding Expense:", error)
      }
    }

    // Reset form and hide after submission
    setExpenseInput({
      price: "",
      expenseTitle: "",
      category: "Expenses Category",
    })
    setShowForm(false) // Hiding the form after submission
  }

  // handling edit button click event - fixed to properly set the expense ID
  const handleEdit = (id) => {
    console.log("Editing expense with ID:", id)
    const expenseToEdit = expensesArray.find((expense) => expense.id === id)

    if (expenseToEdit) {
      console.log("Found expense to edit:", expenseToEdit)
      // Make sure we're setting the ID correctly
      setExpenseInput({
        id: id,
        price: expenseToEdit.price,
        expenseTitle: expenseToEdit.expenseTitle,
        category: expenseToEdit.category,
      })
      setShowForm(true)
    } else {
      console.error("Could not find expense with ID:", id)
    }
  }

  // Fixed delete functionality to handle the stubborn expense
  const handleDelete = async (id) => {
    if (isDeleting) return // Prevent multiple clicks

    try {
      setIsDeleting(true) // Set local deleting state
      console.log("Deleting expense with ID:", id)

      // Manually remove from local state first for immediate UI feedback
      const currentCount = Number.parseInt(localStorage.getItem("cartCount") || "0")
      if (currentCount > 0) {
        localStorage.setItem("cartCount", (currentCount - 1).toString())
        // Trigger a storage event to update the cart count in the header
        window.dispatchEvent(new Event("storage"))
      }

      // Try direct Firebase delete with fetch as a fallback
      try {
        // First try with Redux
        await dispatch(deleteExpenseAsync({ id }))

        // If that doesn't work, try direct fetch
        const response = await fetch(`https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${id}.json`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        console.log("Delete successful via direct fetch")
      } catch (error) {
        console.error("Error in delete operation:", error)
        // Even if both methods fail, we'll still try to update the UI
      }

      // Force refresh expenses list
      dispatch(getExpenseAsync())

      console.log("Delete operation completed")
    } catch (error) {
      console.error("Error Deleting Expense:", error)
      alert("Failed to delete expense. Please try again.")
    } finally {
      // Always reset the deleting state
      setTimeout(() => {
        setIsDeleting(false)
      }, 500)
    }
  }

  // Handling close button click event
  const closeForm = () => {
    setExpenseInput({
      price: "",
      expenseTitle: "",
      category: "Expenses Category",
      id: "",
    })
    setShowForm(false)
  }

  // useEffect hook is used to fetch expenses list when the component mounts
  useEffect(() => {
    dispatch(getExpenseAsync())
  }, [dispatch])

  // handling theme toggle (dark mode)
  const toggleDarkModeHandler = () => {
    dispatch(toggleDarkMode()) // Dispatch the toggleDarkMode action

    // Save the new theme state to localStorage (toggled from current state)
    localStorage.setItem("darkMode", (!themeRedux).toString())
  }

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true"

    // Only dispatch if the current theme doesn't match the saved theme
    if (savedDarkMode !== themeRedux) {
      dispatch(toggleDarkMode())
    }
  }, [])

  // Listen for the change in total amount and toggle dark mode if needed
  useEffect(() => {
    if (totalAmount > 10000) {
      // Enable dark mode toggle button visibility
      // The button is already conditionally rendered based on totalAmount
    }
  }, [totalAmount, dispatch])

  // Effect to sync the body class with the theme state
  useEffect(() => {
    // Check if dark mode is enabled or disabled based on the Redux state
    if (themeRedux) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [themeRedux]) // Only depend on the themeRedux state

  // Initialize with some sample data if no expenses exist
  useEffect(() => {
    const initializeData = async () => {
      if (expensesArray.length === 0 && !expenseRedux.isLoading) {
        // Add sample expenses
        await dispatch(
          createExpenseAsync({
            expenseInput: {
              price: "9.08",
              expenseTitle: "Lunch",
              category: "Food",
            },
          }),
        )

        await dispatch(
          createExpenseAsync({
            expenseInput: {
              price: "60000.00",
              expenseTitle: "Car fuel",
              category: "Fuel",
            },
          }),
        )

        // Set cart count to 2
        localStorage.setItem("cartCount", "2")

        // Fetch updated expenses
        await dispatch(getExpenseAsync())
      }
    }

    initializeData()
  }, [expenseRedux.data, expenseRedux.isLoading, dispatch])

  //Defining header passed in CSVLink . key should have same value as in expensesArray data is inserted
  const header = [
    { label: "No.", key: "no." },
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    { label: "Description", key: "expenseTitle" },
  ]

  return (
    <div className="expenses-container">
      <div className="summary">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Expense Form" : "Add New Expense"}
        </button>
      </div>

      {/* Wrapped download buton in CSVLink */}
      {/* And this CSVLink we will pass the data from where we want to download */}
      <CSVLink data={expensesArray} headers={header} filename="expenseData">
        {/* Button for downloading expenses as CSV file */}
        <div>
          <button className="download">Download</button>
        </div>
      </CSVLink>

      <p className="amount">
        Total Amount: <strong>{totalAmount} Rs</strong>
      </p>

      {/* Conditional rendering if price is more than 10000 */}
      {/* Conditional Button */}
      {totalAmount > 10000 && (
        <div className="alert-btn">
          <button className="darkmode" onClick={toggleDarkModeHandler}>
            Alert: High Expense Total! (Toggle {themeRedux ? "Light" : "Dark"} Mode)
          </button>
        </div>
      )}

      {showForm && (
        <ExpenseForm
          expenseInput={expenseInput}
          handleChange={handleChange}
          handleFormSubmission={handleFormSubmission}
          closeForm={closeForm}
        />
      )}

      <h3 className="heading">Item Expenses</h3>
      <div className="expense-list">
        {expenseRedux.isLoading && !isDeleting ? (
          <h4
            style={{
              padding: "15px",
              backgroundColor: "#000",
              color: "#FFF",
              textAlign: "center",
            }}
          >
            Please wait, data is loading from API
          </h4>
        ) : expensesArray.length ? (
          <table className="table" role="listitem">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expensesArray.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.price} Rs</td>
                  <td>{expense.expenseTitle}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(expense.id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(expense.id)} disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="amount">No expenses added yet.</p>
        )}
      </div>
    </div>
  )
}

export default Expenses



// import React, { useEffect, useState } from "react";
// import "./Expenses.css";
// import ExpenseForm from "./ExpenseForm";
// import { useDispatch, useSelector } from "react-redux"; // it is for redux
// import {
//   createExpenseAsync,
//   deleteExpenseAsync,
//   getExpenseAsync,
//   updateExpenseAsync,
// } from "../../store/slice/ExpenseSlice"; // importing actions from ExpenseSlice

// import { toggleDarkMode } from "../../store/slice/ThemeSlice"; // importing actions from ThemeSlice

// import { CSVLink } from "react-csv"; // for csv import

// const Expenses = () => {
//   // Redux
//   const dispatch = useDispatch();
//   const expenseRedux = useSelector((state) => state.expenses);
//   const themeRedux = useSelector((state) => state.theme.isDarkMode); // getting theme from Redux store

//   // console.log("expenseRedux - ", expenseRedux?.data);

//   const [showForm, setShowForm] = useState(false); // for expense form visibility

//   const [expenseInput, setExpenseInput] = useState({
//     price: "",
//     expenseTitle: "",
//     category: "",
//   });

//   // converting object to array for easier manipulation
//   const expensesArray = Object.keys((expenseRedux && expenseRedux?.data) || {}).map(
//     (key) => ({
//     id: key, // Including the unique identifier key as 'id'
//     ...expenseRedux.data[key],
//   }));

//   const totalAmount = expensesArray.reduce(
//     (sum, expense) => sum + Number(expense.price),
//     0
//   );

//   // for expenses form input change event handler
//   const handleChange = (e) => { 
//     const { name, value } = e.target;
//     setExpenseInput((prevState) => ({ ...prevState, [name]: value }));
//   };

//   // Handling form submission with async/await and also keeping track of id of expense for updating the expense
//   const handleFormSubmission = async (e) => {
//     e.preventDefault();

//     // Condition for checking if expense id is present or not
//     // If id is present, it means we are updating the expense
//     if (expenseInput.id) {
//       try {
//         await dispatch(updateExpenseAsync({ expenseInput })); // updating expense
//       } catch (error) {
//         console.error("Error Updating Expense:", error);
//       }
//     } 
//     // If id is not present, it means we are adding a new expense
//     else {
//       try {
//         await dispatch(createExpenseAsync({ expenseInput }));
//         await dispatch(getExpenseAsync()); // Fetching the expenses list
//       } catch (error) {
//         console.error("Error Adding Expense:", error);
//       }
//     }

//     // Reset form and hide after submission
//     setExpenseInput({
//       price: "",
//       expenseTitle: "",
//       category: "Expenses Category",
//     });
//     setShowForm(false); // Hiding the form after submission
//   };

//   // handling edit button click event
//   const handleEdit = (id) => {
//     const expenseToEdit = expensesArray.find((expense) => expense?.id === id); // Finding the expense to edit from the expense array
//     setExpenseInput(expenseToEdit); // Setting the expense input with the expense to edit data
//     setShowForm(true); // Show form for editing
//   };

//   // handling delete button click event
//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteExpenseAsync({ id })); // Deleting the expense
//       await dispatch(getExpenseAsync()); // Refresh after deletion and getting the updated expenses list after delete
//     } catch (error) {
//       console.error("Error Deleting Expense:", error);
//     }
//   };

//   // Handling close button click event
//   const closeForm = () => {
//     setExpenseInput({
//       price: "",
//       expenseTitle: "",
//       category: "Expenses Category",
//       id: "",
//     });
//     setShowForm(false);
//   };

//   // useEffect hook is used to fetch expenses list when the component mounts
//   useEffect(() => {
//     dispatch(getExpenseAsync());
//   }, [dispatch]);

//   // // Adding Dark mode theme reducer
//    // handling theme toggle (dark mode)
//    const toggleDarkModeHandler = () => {
//     dispatch(toggleDarkMode()); // Dispatch the toggleDarkMode action
//   };

//    // Listen for the change in total amount and toggle dark mode if needed
//   useEffect(() => {
//       if (totalAmount < 10000 && themeRedux) {
//         dispatch(toggleDarkMode());  // Turn off dark mode if totalAmount is below 10000
//       }
//   }, [totalAmount, themeRedux, dispatch]);

//   // Effect to sync the body class with the theme state
//   useEffect(() => {
//     // Check if dark mode is enabled or disabled based on the Redux state
//     if (themeRedux) {
//       document.body.classList.add("dark");
//     } else {
//       document.body.classList.remove("dark");
//     }
//   }, [themeRedux]);  // Only depend on the themeRedux.isDarkMode state


//   //Defining header passed in CSVLink . key should have same value as in expensesArray data is inserted
//   const header = [
//     { label: "No.", key: "no." },
//     { label: "Price", key: "price" },
//     { label: "Category", key: "category" },
//     { label: "Description", key: "expenseTitle" },
//   ]


//   return (
//     <div className="expenses-container">
//       <div className="summary">
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close Expense Form" : "Add New Expense"}
//         </button>
//       </div>

//       {/* Wrapped download buton in CSVLink */}
//       {/* And this CSVLink we will pass the data from where we want to download */}
//       <CSVLink data={expensesArray} headers={header} filename="expenseData">
//         {/* Button for downloading expenses as CSV file */}
//         <div >
//           <button className="download">Download</button>
//         </div>
//       </CSVLink>
      
//       <p className="amount">
//         Total Amount: <strong>{totalAmount} Rs</strong>
//       </p>

//       {/* Conditional rendering if price is more than 10000 */}
//       {/* Conditional Button */}
//       {totalAmount > 100000 && (
//         <div className="alert-btn">
//           {/* <button className="darkMode">
//             Alert: High Expense Total!
//           </button> */}
//           {/* Adding dark mode toggle */}
//           <button className="darkmode" onClick={toggleDarkModeHandler}>
//             Alert: High Expense Total! (Toggle {themeRedux.isDarkMode ? "Light" : "Dark"} Mode)
//           </button>
//         </div>
//       )}

//       {showForm && (
//         <ExpenseForm
//           expenseInput={expenseInput}
//           handleChange={handleChange}
//           handleFormSubmission={handleFormSubmission}
//           closeForm={closeForm}
//         />
//       )}

//       <h3 className="heading">Item Expenses</h3>
//       <div className="expense-list">
//         {expenseRedux.isLoading ? (
//           <h4
//             style={{
//               padding: "15px",
//               backgroundColor: "#000",
//               color: "#FFF",
//               textAlign: "center",
//             }}
//           >
//             Please wait, data is loading from API
//           </h4>
//         ) : expensesArray.length ? (
//           <table className="table" role="listitem">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 {/* <th>id</th> */}
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expensesArray.map((expense, index) => (
//                 <tr key={expense.id}>
//                   <td>{index + 1}</td>
//                   {/* <td>{expense.id}</td> */}
//                   <td>{expense.price} Rs</td>
//                   <td>{expense.expenseTitle}</td>
//                   <td>{expense.category}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning"
//                       onClick={() => handleEdit(expense.id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(expense.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="amount">No expenses added yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Expenses;
