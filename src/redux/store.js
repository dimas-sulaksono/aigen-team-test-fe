import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import navbarReducer from "./navbarReduce";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    navbar: navbarReducer,
  },
});
