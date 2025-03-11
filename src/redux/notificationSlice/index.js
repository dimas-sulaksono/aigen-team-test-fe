import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "success",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
      state.isVisible = true;
    },
    hideNotification: (state) => {
      state.isVisible = false;
      state.message = "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const showNotificationWithTimeout =
  ({ message, type, duration = 3000 }) =>
  (dispatch) => {
    dispatch(showNotification({ message, type }));

    setTimeout(() => {
      dispatch(hideNotification());
    }, duration);
  };

export default notificationSlice.reducer;
