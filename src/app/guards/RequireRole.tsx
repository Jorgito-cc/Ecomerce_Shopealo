import { ReactNode, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Allowed = Array<string | number>;

type Props = {
  children: ReactNode;
  allow: Allowed; // ej: ['ADMINISTRADOR'] o [1] o ['ADMINISTRADOR', 1]
  fallback?: string; // a dónde mandar si no tiene permiso (default '/')
};

export const RequireRole = ({ children, allow, fallback = "/" }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const ok = useMemo(() => {
    if (!user) return false;

    const byName = typeof user.rolNombre === "string"
      ? allow.includes(user.rolNombre)
      : false;

    const byId = typeof user.rolId === "number"
      ? allow.includes(user.rolId)
      : false;

    return byName || byId;
  }, [user, allow]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!ok) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};
