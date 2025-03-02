import { createSlice } from '@reduxjs/toolkit';

const initialState = { expenses: [], totalExpenseAmount: 0 };

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    fetchedExpense(state, action) {
      state.expenses = action.payload.fetchedData;
      state.totalExpenseAmount = action.payload.totalExpenseAmount;
    },

    addExpense(state, action) {
      state.expenses = [...state.expenses, action.payload];
      state.totalExpenseAmount += action.payload.amount;
    },

    editExpense(state, action) {
      const updatedExpenses = state.expenses.map((e) => {
        if (e.id === action.payload.id) {
          state.totalExpenseAmount =
            state.totalExpenseAmount - e.amount + action.payload.amount; // Subtracting the old amount (e.amount).
                                                                                 // Adding the new amount (action.payload.amount).
          return action.payload;  // Returns the new updated expense when the id matches.
        }
        return e;//  Returns the original expense if the id does not match.
      });
      state.expenses = updatedExpenses;  //Replaces the existing state.expenses with the newly updated array.
    },

    deleteExpense(state, action) {
      const updatedExpenses = state.expenses.filter((e) => {
        return e.id !== action.payload.delId;
      });
      state.expenses = updatedExpenses;
      state.totalExpenseAmount -= action.payload.amount;
    },
  },
});

export const { fetchedExpense, addExpense, editExpense, deleteExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;







// reducers:
// An object that contains functions to handle different actions that update the state.


// In Redux, a slice represents a modular portion of your global state along with the actions and reducers that manage that state.

// Slice = Part of the Store:
// A slice represents a specific part of your Redux state.

// Encapsulated Logic:
// It groups the state, actions, and reducers for that particular domain.

// Simplification:
// createSlice from Redux Toolkit simplifies creating and managing these slices by reducing boilerplate code.

// createSlice helps in creating a Redux slice, which includes action creators and reducers in a single function.
// createSlice is used to define a Redux slice.
// name: 'expense': The slice is named "expense", which is used internally to generate action types.
// initialState: The initial state is passed to the slice.
// reducers: Contains multiple functions (reducers) that modify the state.

// . Fetched Expense Data


// fetchedExpense(state, action) {
//   state.expenses = action.payload.fetchedData;
//   state.totalExpenseAmount = action.payload.totalExpenseAmount;
// }
// This upper reducer updates the state when expense data is fetched from an API or local storage.

// export default expenseSlice.reducer;
// Exports the slice's reducer as the default export, which can then be added to your Redux store.


// export const { fetchedExpense, addExpense, editExpense, deleteExpense } =
//   expenseSlice.actions;
// Extracts the action creators for the reducers defined in the slice.
// These action creators can be dispatched from components to update the state.