import axiosInstance from "./axiosInstance";
export type AccountCreationResponse = {
  accountUid: string;
};

export type AccountCreationRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type AccountLoginRequest = {
  email: string;
  password: string;
};

export type AccountLoginResponse = {
  ok: boolean;
};

export type AccountLogoutResponse = {
  ok: boolean;
};

export async function createAccount(
  accountCreationRequest: AccountCreationRequest
): Promise<AccountCreationResponse> {
  const requestbody = JSON.stringify(accountCreationRequest)
  const response = await axiosInstance.post("/api/v1/auth/create-account", 
    requestbody,
    { withCredentials: false,
      headers: { 
        "Content-Type": "application/json" 
      } 
    }
  );
  if (response.status !== 200) {
    console.log(response);
    throw new Error("Account creation failed");
  }
  return response.data;
}

export async function login(
  accountLoginRequest: AccountLoginRequest
): Promise<AccountLoginResponse> {

  const requestbody = JSON.stringify(accountLoginRequest)
  const response = await axiosInstance.put("/api/v1/auth/login", 
    requestbody,
    { headers: { 
        "Content-Type": "application/json" 
      } 
    }
  );
  if (response.status !== 200) {
    console.log(response);
    throw new Error("Login failed");
  }
  return {ok: response.status === 200};
}

export async function logout(): Promise<AccountLogoutResponse> {
  const response = await axiosInstance.delete("/api/v1/auth/logout");
  if (response.status !== 200) {
    console.log(response);
    throw new Error("Logout failed");
  }
  return { ok: response.status === 200 };
}
