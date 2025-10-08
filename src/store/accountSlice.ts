import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export interface Account {
  accountUid: string;
  email: string;
  firstName: string;
  lastName: string;
  authenticated: boolean;
}

const initialState: Account = {
  accountUid: "",
  email: "",
  firstName: "",
  lastName: "",
  authenticated: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<{ account: Account }>) => {
      state.accountUid = action.payload.account.accountUid;
      state.email = action.payload.account.email;
      state.firstName = action.payload.account.firstName;
      state.lastName = action.payload.account.lastName;
      state.authenticated = action.payload.account.authenticated;
      return state;
    },
    clearAccount: () => initialState,
  },
});
export const useAccount = () => useSelector((state: RootState) => state.account);
export const { setAccount, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
