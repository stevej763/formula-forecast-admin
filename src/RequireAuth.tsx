import { useEffect, useState, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAccountDetails } from "./api/accountDetailsApiClient";
import { setAccount, useAccount } from "./store/accountSlice";
import LoaderSpinner from "./shared/components/LoaderSpinner";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const account = useAccount();
  const dispatch = useDispatch();
  const isAuthenticated = account?.authenticated ?? false;
  // On a page refresh the store is empty, so check the session cookie
  // before sending the user back to sign in.
  const [checking, setChecking] = useState(!isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) return;
    getAccountDetails()
      .then((details) => {
        if (details?.authenticated) dispatch(setAccount({ account: details }));
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [isAuthenticated, dispatch]);

  if (isAuthenticated) return <>{children}</>;
  if (checking) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }
  return <Navigate to="/" replace />;
}
