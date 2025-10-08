import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAccount } from "./store/accountSlice";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const account = useAccount();
    const isAuthenticated = account?.authenticated ?? false;
    return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}
