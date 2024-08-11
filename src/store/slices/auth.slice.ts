import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  user: any;
}

const initialState: StateType = {
  user: {
    userRoles: [
      {
        name: "student",
        permissions: [],
      },
    ],
    selectedRole: null,
    email: "",
    fullName: "",
    phone: "",
    userName: "",
  },
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state: StateType, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },
    example: () => {
      return console.log("hi");
    },
  },
});

export const { updateUser, example } = authSlice.actions;

export default authSlice.reducer;
