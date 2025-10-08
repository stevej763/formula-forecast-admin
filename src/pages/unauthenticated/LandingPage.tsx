import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAccount } from "../../store/accountSlice";
import LoginForm from "./LoginForm";
import { login } from "../../api/authenticationApiClient";
import { getAccountDetails } from "../../api/accountDetailsApiClient";
import type { AccountLoginResponse } from "../../api/authenticationApiClient";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const environment = import.meta.env.VITE_APP_ENV;
  const [formType, setFormType] = useState<"login" | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      getAccountDetails().then((account) => {
      if (account?.authenticated) {
        dispatch(setAccount({ account }));
        navigate("/home");
      }
    });
  }, [dispatch, navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response: AccountLoginResponse = await login({ email, password });
      console.log("Login successful:", response.ok);
      const accountDetails = await getAccountDetails();
      dispatch(setAccount({ account: accountDetails }));
      navigate("/home");
    } catch (error) {
      console.error("Login or fetching account details failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 px-4">
      <div className="w-full max-w-sm bg-white/5 rounded-xl shadow-lg p-8 flex flex-col items-center border border-blue-500/20">
        <img
          src="/logo-01-white-outline-no-background.png"
          alt="Formula Forecast Admin Logo"
          width={150}
          height={150}
          className="h-[150px] w-[150px] object-contain mb-4"
        />
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
        </div>
        <div className="w-full flex flex-col gap-4">
          {formType === "login" && (
            <LoginForm
              onLogin={handleLogin}
              onBack={() => setFormType(null)}
            />
          )}
          {formType === null && (
            <button
              onClick={() => setFormType("login")}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 active:bg-blue-800 transition-colors duration-150"
            >
              Login
            </button>
          )}
          {/* Back button now handled inside form components */}
        </div>
      </div>
      <div className="mt-8 text-blue-200 text-center text-xs opacity-80">
        &copy; {new Date().getFullYear()} Formula Forecast. All rights reserved. {environment}
      </div>
    </div>
  );
};

export default LandingPage;
