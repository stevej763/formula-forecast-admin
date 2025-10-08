import axiosInstance from "./axiosInstance";


export type AccountDetails = {
  accountUid: string;
  email: string;
  firstName: string;
  lastName: string;
  authenticated: boolean;
};


export const getAccountDetails = async (): Promise<AccountDetails> => {
  const response = await axiosInstance.get("/api/v1/auth/current-user");
  if (response.status !== 200) {
    console.log(response);
    throw new Error("Failed to fetch account details");
  }
  return response.data;
};