import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInUser, updateUser, signOutUser } = userSlice.actions;

export default userSlice.reducer;
