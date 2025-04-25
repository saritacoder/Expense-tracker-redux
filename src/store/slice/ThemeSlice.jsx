import { createSlice } from "@reduxjs/toolkit"

// Get initial state from localStorage if available
const getSavedDarkMode = () => {
  try {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode === "true"
  } catch (error) {
    return false // Default to light mode if there's an error
  }
}

const initialState = {
  isDarkMode: getSavedDarkMode(), // Initialize from localStorage
}

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
      // We'll handle localStorage in the component to avoid side effects in reducers
    },
  },
})

export const { toggleDarkMode } = ThemeSlice.actions
export default ThemeSlice.reducer





// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isDarkMode: false,  // default is false, light mode
// };

// const ThemeSlice = createSlice({
//   name: 'theme',
//   initialState,
//   reducers: {
//     toggleDarkMode: (state) => {
//       state.isDarkMode = !state.isDarkMode;
//     },
//   },
// });

// export const { toggleDarkMode } = ThemeSlice.actions;
// export default ThemeSlice.reducer;
