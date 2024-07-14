import { createSlice } from "@reduxjs/toolkit";
import userData from "../data/userdata.json"; // Importing JSON data

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updatePassword: (state, action) => {
      const { newPassword } = action.payload;
      if (state.user) {
        const updatedUser = { ...state.user, password: newPassword };
        state.user = updatedUser;

        const updatedUserData = userData.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        );


      }
    },
  },
});

export const { login, logout, updatePassword } = userSlice.actions;

export default userSlice.reducer;
