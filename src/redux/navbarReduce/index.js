import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    hideNavbar: false,
    menuOpen: false,
    dropdownOpen: false,
  },
  reducers: {
    hideNavbar: (state) => {
      state.hideNavbar = true;
    },
    showNavbar: (state) => {
      state.hideNavbar = false;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
    toggleDropdown: (state) => {
      state.dropdownOpen = !state.dropdownOpen;
    },
    closeAll: (state) => {
      state.menuOpen = false;
      state.dropdownOpen = false;
    },
  },
});

export const { hideNavbar, showNavbar, toggleMenu, toggleDropdown, closeAll } =
  navbarSlice.actions;

export default navbarSlice.reducer;
