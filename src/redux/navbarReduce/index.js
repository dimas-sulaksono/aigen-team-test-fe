// navbarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    hideNavbar: false,
  },
  reducers: {
    hideNavbar: (state) => {
      state.hideNavbar = true;
    },
    showNavbar: (state) => {
      state.hideNavbar = false;
    },
  },
});

export const { hideNavbar, showNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;
