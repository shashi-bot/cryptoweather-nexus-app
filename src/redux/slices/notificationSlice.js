import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { items: [] },
  reducers: {
    addNotification: (state, action) => {
      const { id, message, type } = action.payload;
      state.items.push({ id, message, type });
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

