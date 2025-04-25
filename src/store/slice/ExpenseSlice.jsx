import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const HOSTNAME = "https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses.json"

export const createExpenseAsync = createAsyncThunk("createExpense", async ({ expenseInput }) => {
  try {
    const response = await axios.post(`${HOSTNAME}`, expenseInput)
    return response.data
  } catch (error) {
    console.log("createExpenseAsync Error - ", error)
    throw error
  }
})

export const getExpenseAsync = createAsyncThunk("getExpense", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}`)
    return response.data || {} // Return empty object if null
  } catch (error) {
    console.log("getExpenseAsync Error - ", error.response)
    return {} // Return empty object on error
  }
})

// Fixed updateExpenseAsync to properly handle the update
export const updateExpenseAsync = createAsyncThunk("updateExpense", async ({ expenseInput }) => {
  try {
    console.log("Updating expense in thunk:", expenseInput)

    // Make sure we're not sending the ID in the body
    const { id, ...expenseData } = expenseInput

    const response = await axios.put(
      `https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${id}.json`,
      expenseData,
    )

    console.log("Update response:", response.data)
    return { id, data: response.data }
  } catch (error) {
    console.log("updateExpenseAsync Error - ", error)
    throw error
  }
})

// Enhanced deleteExpenseAsync to handle stubborn expenses
export const deleteExpenseAsync = createAsyncThunk("deleteExpense", async ({ id }, { rejectWithValue }) => {
  try {
    console.log("Deleting expense with ID in thunk:", id)

    // Try with axios first
    const response = await axios.delete(`https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${id}.json`)

    console.log("Delete response:", response)

    // If successful, return the id
    return { id, data: response.data }
  } catch (error) {
    console.log("deleteExpenseAsync Error - ", error)

    // Try with fetch as a fallback
    try {
      const fetchResponse = await fetch(
        `https://expensetracker-8e391-default-rtdb.firebaseio.com/expenses/${id}.json`,
        { method: "DELETE" },
      )

      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`)
      }

      const data = await fetchResponse.json()
      return { id, data }
    } catch (fetchError) {
      console.log("Fetch fallback error:", fetchError)
      return rejectWithValue({ error: error.message, id })
    }
  }
})

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
}

export const ExpenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    // Add a direct reducer to remove an expense from state
    removeExpense: (state, action) => {
      const { id } = action.payload
      if (state.data && state.data[id]) {
        const newData = { ...state.data }
        delete newData[id]
        state.data = newData
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createExpenseAsync.pending, (state) => {
        state.isLoading = true
      })

      .addCase(createExpenseAsync.fulfilled, (state) => {
        state.isLoading = false
      })

      .addCase(createExpenseAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(getExpenseAsync.pending, (state) => {
        state.isLoading = true
      })

      .addCase(getExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })

      .addCase(getExpenseAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.data = {} // Reset to empty object on error
      })

      // Fixed update case
      .addCase(updateExpenseAsync.pending, (state) => {
        state.isLoading = true
      })

      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false

        // Get the id from the action payload
        const { id } = action.meta.arg.expenseInput

        if (state.data && state.data.hasOwnProperty(id)) {
          const { category, expenseTitle, price } = action.meta.arg.expenseInput
          state.data[id] = {
            category,
            expenseTitle,
            price,
          }
          console.log(`Updated expense with id: ${id}`, state.data[id])
        } else {
          console.log(`No expense found with id: ${id}`)
        }
      })

      .addCase(updateExpenseAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(deleteExpenseAsync.pending, (state) => {
        state.isLoading = true
      })

      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.isLoading = false

        // Get the id from the action meta
        const { id } = action.meta.arg
        console.log("Delete fulfilled with ID:", id)

        // Check if the data exists and has the property
        if (state.data && state.data.hasOwnProperty(id)) {
          // Create a new object without the deleted expense
          const newData = { ...state.data }
          delete newData[id]
          state.data = newData
          console.log(`Deleted expense with id: ${id}`)
        } else {
          console.log(`No expense found with id: ${id}`)
        }
      })

      .addCase(deleteExpenseAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true

        // Even on rejection, try to remove the expense from state
        if (action.payload && action.payload.id) {
          const { id } = action.payload
          if (state.data && state.data[id]) {
            const newData = { ...state.data }
            delete newData[id]
            state.data = newData
          }
        }
      })
  },
})

export const { removeExpense } = ExpenseSlice.actions
export default ExpenseSlice.reducer
