import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = { children: ReactNode; to?: string };

export const RedirectIfAuth = ({ children, to = "/" }: Props) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={to} replace />;
  return <>{children}</>;
};
