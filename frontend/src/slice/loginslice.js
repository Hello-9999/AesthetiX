import { createSlice } from "@reduxjs/toolkit";

const loginslice = createSlice({
  name: "login",
  initialState: {
    isLoggediin: false,
    JWT: "",
    Role: "",
    Name: "",
    Email: "",
  },
  reducers: {
    login: (state, data) => {
      (state.isLoggediin = true),
        (state.JWT = data.payload.token),
        (state.Email = data.payload.email),
        (state.Name = data.payload.name),
        (state.Role = data.payload.role);
    },
  },
});

export default loginslice.reducer;
export const { login } = loginslice.actions;
