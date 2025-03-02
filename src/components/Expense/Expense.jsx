// import { useEffect, useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';
// import {
//   fetchedExpense,
//   addExpense,
//   editExpense,
//   deleteExpense,
// } from '../../store/expenseSlice';
// import { setProMember, setTheme } from '../../store/userSlice';

// import ExpenseItems from './ExpenseItems';
// import ExpenseForm from './ExpenseForm';
// import DataLoader from '../UI/DataLoader';
// import Modal from '../UI/Modal';

// import premium from '../../assets/premium.svg';
// import { LightModeIcon, DarkModeIcon, DownloadIcon } from '../../assets/Icons';

// export default function Expense() { 
//   const expenses = useSelector((state) => state.expenseState.expenses);  // refers to the global Redux store.
//   const totalExpenseAmount = useSelector(
//     (state) => state.expenseState.totalExpenseAmount
//   );

//   const proMember = useSelector((state) => state.userState.proMember);
//   const theme = useSelector((state) => state.userState.theme);

//   const dispatch = useDispatch();

//   const [showForm, setShowForm] = useState(false);
//   const [dataLoader, setDataLoader] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   function handleAddExpense(newExpense) {
//     dispatch(addExpense(newExpense));
//     setShowModal({
//       title: 'Success',
//       message: 'Expense has been Added',
//     });
//   }

//   function handleEditExpense(editedExpense) {
//     dispatch(editExpense(editedExpense));
//     setShowModal({
//       title: 'Success',
//       message: 'Expense has been updated',
//     });
//   }

//   function handleDeleteExpense(delId, amount) {
//     dispatch(deleteExpense({ delId, amount }));
//     setShowModal({
//       title: 'Success',
//       message: 'Expense has been deleted',
//     });
//   }

//   useEffect(() => {  // runs after the component renders.
//     async function fetchExpenses() {
//       setDataLoader(true);
//       const response = await fetch(
//         'https://expense-tracker-826be-default-rtdb.firebaseio.com/expenses.json'
//        ); //The expenses key holds all the expense records as child objects.
//       // It tells Firebase to return data in JSON format.

//       const data = await response.json();

//       if (response.ok) {
//         const fetchedData = [];
//         let totalExpenseAmount = 0;

//         for (const key in data) { //data is an object that contains multiple expense items.
//           fetchedData.push({
//             id: key,
//             amount: data[key].amount,
//             description: data[key].description,
//             category: data[key].category,
//           });
//           totalExpenseAmount += data[key].amount;
//         }
//         dispatch(fetchedExpense({ fetchedData, totalExpenseAmount }));
//       } else {
//         alert('error');
//       }
//       setDataLoader(false);
//     }
//     fetchExpenses();
//   }, []); // Empty dependency array [] → Runs only once when the

//   let content;
//   {
//     content = <p className="text-center text-lg">No expenses found.</p>;
//     if (expenses.length > 0) {
//       content = (
//         <ul className="w-11/12 sm:max-w-3xl">
//           {expenses.map((e) => {
//             return (
//               <ExpenseItems
//                 key={e.id}
//                 id={e.id}
//                 amount={e.amount}
//                 description={e.description}
//                 category={e.category}
//                 onEditExpense={handleEditExpense}
//                 onDeleteExpense={handleDeleteExpense}
//               />
//             );
//           })}
//         </ul>
//       );
//     }
//     if (dataLoader) {
//       content = (
//         <div className="flex justify-center">
//           <DataLoader />
//         </div>
//       );
//     }
//   }

//   return (
//     <div className="flex flex-col justify-center items-center gap-5 dark:text-white">
//       {!showForm && (
//         <button
//           className="mt-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={() => setShowForm(true)}
//         >
//           Add new expense
//         </button>
//       )}
//       {showForm && (
//         <ExpenseForm
//           onCloseForm={() => setShowForm(false)}
//           onAddExpense={handleAddExpense}
//         />
//       )}
//       <div className="w-11/12 sm:max-w-3xl flex justify-between items-center">
//         <div>
//           <h1 className="inline">Total Expense: </h1>
//           <span className="font-semibold text-lg">{totalExpenseAmount}</span>
//         </div>
//         {totalExpenseAmount > 10000 && (
//           <button
//             className="rounded border-2 border-indigo-600 px-2 py-1 flex items-center gap-1 hover:bg-indigo-600 hover:text-white"
//             onClick={() => dispatch(setProMember())}
//           >
//             <img className="inline" src={premium} alt="..." width={20} />
//             <span>{proMember ? 'Deactivate Pro' : 'Activate Pro'}</span>
//           </button>
//         )}
//       </div>
//       {proMember && (
//         <div className="w-11/12 sm:max-w-3xl bg-gray-400 p-1 rounded-md flex">
//           <button
//             onClick={() => {
//               dispatch(setTheme());
//             }}
//           >
//             {theme ? <LightModeIcon /> : <DarkModeIcon />}
//           </button>

//           <a
//             className="ml-10 cursor-pointer"
//             id="a1"
//             onClick={() => {
//               const expenseItem = expenses.map((e) => Object.values(e));
//               expenseItem.map((d) => d.shift());
//               expenseItem.unshift(['Amount', 'Description', 'Category']);

//               const expensesToDownload = expenseItem
//                 .map((e) => e.join())
//                 .join('\n');

//               const a1 = document.getElementById('a1');
//               const blob1 = new Blob([expensesToDownload]); // Blob- (Binary Large Object)  This allows us to store and download CSV data as a file.
//               a1.href = URL.createObjectURL(blob1);
//             }}
//             download="expenses.csv"
//             target="_blank"
//           >
//             <DownloadIcon />
//           </a>
//         </div>
//       )}

//       {content}

//       {showModal && (
//         <Modal
//           title={showModal.title}
//           message={showModal.message}
//           onClick={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// }





// =========


import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchedExpense,
  addExpense,
  editExpense,
  deleteExpense,
} from '../../store/expenseSlice';
import { setProMember, setTheme } from '../../store/userSlice';
import ExpenseItems from './ExpenseItems';
import ExpenseForm from './ExpenseForm';
import DataLoader from '../UI/DataLoader';
import Modal from '../UI/Modal';
import premium from '../../assets/premium.svg';
import { LightModeIcon, DarkModeIcon, DownloadIcon } from '../../assets/Icons';

export default function Expense() {
  const expenses = useSelector((state) => state.expenseState.expenses);
  const totalExpenseAmount = useSelector((state) => state.expenseState.totalExpenseAmount);
  const proMember = useSelector((state) => state.userState.proMember);
  const theme = useSelector((state) => state.userState.theme);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleAddExpense(newExpense) {
    dispatch(addExpense(newExpense));
    setShowModal({ title: 'Success', message: 'Expense has been added' });
  }

  function handleEditExpense(editedExpense) {
    dispatch(editExpense(editedExpense));
    setShowModal({ title: 'Success', message: 'Expense has been updated' });
  }

  function handleDeleteExpense(delId, amount) {
    dispatch(deleteExpense({ delId, amount }));
    setShowModal({ title: 'Success', message: 'Expense has been deleted' });
  }

  useEffect(() => {
    async function fetchExpenses() {
      setDataLoader(true);
      const response = await fetch('https://expense-tracker-826be-default-rtdb.firebaseio.com/expenses.json');
      const data = await response.json();
      if (response.ok) {
        const fetchedData = [];
        let totalExpenseAmount = 0;
        for (const key in data) {
          fetchedData.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          });
          totalExpenseAmount += data[key].amount;
        }
        dispatch(fetchedExpense({ fetchedData, totalExpenseAmount }));
      } else {
        alert('Error fetching expenses');
      }
      setDataLoader(false);
    }
    fetchExpenses();
  }, [dispatch]);

  useEffect(() => {
    if (totalExpenseAmount >= 10000 && !proMember) {
      dispatch(setProMember(true));
    } else if (totalExpenseAmount < 10000 && proMember) {
      dispatch(setProMember(false));
    }
  }, [totalExpenseAmount, proMember, dispatch]);

  let content = <p className="text-center text-lg">No expenses found.</p>;
  if (expenses.length > 0) {
    content = (
      <ul className="w-11/12 sm:max-w-3xl">
        {expenses.map((e) => (
          <ExpenseItems key={e.id} id={e.id} amount={e.amount} description={e.description} category={e.category} onEditExpense={handleEditExpense} onDeleteExpense={handleDeleteExpense} />
        ))}
      </ul>
    );
  }
  if (dataLoader) {
    content = (
      <div className="flex justify-center">
        <DataLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 dark:text-white">
      {!showForm && (
        <button className="mt-10 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500" onClick={() => setShowForm(true)}>
          Add new expense
        </button>
      )}
      {showForm && <ExpenseForm onCloseForm={() => setShowForm(false)} onAddExpense={handleAddExpense} />}
      <div className="w-11/12 sm:max-w-3xl flex justify-between items-center">
        <div>
          <h1 className="inline">Total Expense: </h1>
          <span className="font-semibold text-lg">{totalExpenseAmount}</span>
        </div>
        {totalExpenseAmount > 10000 && (
          <button className="rounded border-2 border-indigo-600 px-2 py-1 flex items-center gap-1 hover:bg-indigo-600 hover:text-white" onClick={() => dispatch(setProMember())}>
            <img className="inline" src={premium} alt="..." width={20} />
            <span>{proMember ? 'Deactivate Pro' : 'Activate Pro'}</span>
          </button>
        )}
      </div>
      {proMember && (
        <div className="w-11/12 sm:max-w-3xl bg-gray-400 p-1 rounded-md flex">
          <button onClick={() => dispatch(setTheme())}>{theme ? <LightModeIcon /> : <DarkModeIcon />}</button>
          {/* <a className="ml-10 cursor-pointer" id="a1" onClick={() => {
              const expenseItem = expenses.map((e) => Object.values(e));
              expenseItem.map((d) => d.shift());
              expenseItem.unshift(['Amount', 'Description', 'Category']);
              const expensesToDownload = expenseItem.map((e) => e.join()).join('\n');
              const blob1 = new Blob([expensesToDownload]);
              document.getElementById('a1').href = URL.createObjectURL(blob1);
            }}
            download="expenses.csv"
            target="_blank"
          >
            <DownloadIcon />
          </a> */}
       
       <a
  className="ml-10 cursor-pointer"
  id="a1"
  onClick={() => {
    const expenseItem = expenses.map((e) => [e.amount, e.description, e.category]); // Ensure correct order
    expenseItem.unshift(['Amount', 'Description', 'Category']);
    const expensesToDownload = expenseItem.map((e) => e.join(',')).join('\n'); // Ensure proper CSV formatting
    const blob = new Blob([expensesToDownload], { type: 'text/csv' }); // Explicitly set type
    const a = document.getElementById('a1');
    a.href = URL.createObjectURL(blob);
  }}
  download="expenses.csv"
  target="_blank"
>
  <DownloadIcon />
</a>

       
       
        </div>
      )}
      {content}
      {showModal && <Modal title={showModal.title} message={showModal.message} onClick={() => setShowModal(false)} />}
    </div>
  );
}





// The <a> tag typically navigates to a new page, but here, it's

// const expenses = useSelector((state) => state.expenseState.expenses);
// const totalExpenseAmount = useSelector(
//   (state) => state.expenseState.totalExpenseAmount
// );
// state refers to the global Redux store.
// state.expenseState refers to the expense-related slice of the store.
// state.expenseState.expenses fetches the list of expenses from the Redux store.
// state.expenseState.totalExpenseAmount fetches the total amount of all expenses.
// In the Expense component, useSelector is retrieving:
//  expenses → The current list of expenses to be displayed.
//  totalExpenseAmount → The total sum of all expenses to be shown in the UI
// Whenever an expense is added, edited, or deleted, Redux updates expenseState, and the Expense component re-renders automatically.




// function handleAddExpense(newExpense) {
//   dispatch(addExpense(newExpense));
//   setShowModal({
//     title: 'Success',
//     message: 'Expense has been Added',
//   });
// }
// dispatch is a function from React-Redux used to send actions to the Redux store.
// addExpense(newExpense) is an action creator from expenseSlice.js that updates the Redux state.



// for (const key in data) { //data is an object that contains multiple expense items.
//   fetchedData.push({
//     id: key,
//     amount: data[key].amount,
//     description: data[key].description,
//     category: data[key].category,
//   });
//   totalExpenseAmount += data[key].amount;
// }

// data[key] is not an array.
// The square brackets ([]) are used because we need dynamic property access.
// Without [], we can't loop through an object dynamically.

// The use of .shift() and .unshift() in this code serves specific purposes:

// Why .shift()?

// expenseItem.map((d) => d.shift());
// .shift() removes the first element from each array in expenseItem.
// The first element is likely an id, which is not needed in the CSV file.
// Example Before shift():


// [
//   ["1", 200, "Food", "Grocery"],
//   ["2", 500, "Fuel", "Transport"]
// ]
// After shift():


// [
//   [200, "Food", "Grocery"],
//   [500, "Fuel", "Transport"]
// ]
// Now, only relevant columns remain.

// Why .unshift()?

// expenseItem.unshift(['Amount', 'Description', 'Category']);
// .unshift() adds a header row to the beginning of the array.
// This is useful because CSV files usually have a header row describing the data.
// Example After unshift():


// [
//   ["Amount", "Description", "Category"],
//   [200, "Food", "Grocery"],
//   [500, "Fuel", "Transport"]
// ]
// Now, the CSV file will have column names at the top.

// Summary
// .shift() removes unnecessary id values.
// .unshift() adds a meaningful header row.
// This ensures the downloaded CSV is clean and readable.