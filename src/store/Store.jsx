import { configureStore } from "@reduxjs/toolkit";

import ExpenseReducer from './slice/ExpenseSlice';
import AuthReducer from './slice/AuthSlice';
import ThemeReducer from './slice/ThemeSlice';

export const Store = configureStore({  //In configureStore we pass all slice 
  reducer: {
    expenses: ExpenseReducer, // this(expenses) name of this slice can be used anywhere wherever needed.
    auth: AuthReducer, // auth is another slice
    theme: ThemeReducer, // theme is another slice
  },
});
