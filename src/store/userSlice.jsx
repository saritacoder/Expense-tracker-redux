// import { createSlice } from '@reduxjs/toolkit';

// const initialState = { proMember: false, theme: '' };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setProMember(state) {
//       state.proMember = !state.proMember;
//       if (state.theme) {
//         state.theme = false;
//         document.body.classList.toggle('dark');
//       }
//     },
//     setTheme(state) {
//       state.theme = !state.theme;
//       document.body.classList.toggle('dark');
//     },
//   },
// });

// export const { setProMember, setTheme } = userSlice.actions;
// export default userSlice.reducer;





import { createSlice } from '@reduxjs/toolkit';

const initialState = { proMember: false, theme: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setProMember(state, action) {
      if (action.payload !== undefined) {
        state.proMember = action.payload; // Allow explicit enable/disable
      } else {
        state.proMember = !state.proMember; // Toggle if no payload
      }

      if (!state.proMember && state.theme) {
        state.theme = false; // Disable dark mode when Pro is disabled
        document.body.classList.remove('dark');
      }
    },

    setTheme(state) {
      state.theme = !state.theme;
      document.body.classList.toggle('dark');
    },
  },
});

export const { setProMember, setTheme } = userSlice.actions;
export default userSlice.reducer;
