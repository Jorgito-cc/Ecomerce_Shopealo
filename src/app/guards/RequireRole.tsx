import type { ReactNode } from "react";
import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Allowed = Array<string | number>;

type Props = {
  children: ReactNode;
  allow: Allowed; // ej: ['ADMINISTRADOR'] o [1]
  fallback?: string; // redirección si no tiene permiso
  requirePermiso?: string; // 👈 agrega esta línea
};

export const RequireRole = ({ children, allow, fallback = "/", requirePermiso }: Props) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Obtenemos permisos guardados del rol
  const permisos = JSON.parse(localStorage.getItem("role_permisos") || "[]");

  const ok = useMemo(() => {
    if (!user) return false;

    const byName = typeof user.rolNombre === "string" && allow.includes(user.rolNombre);
    const byId = typeof user.rolId === "number" && allow.includes(user.rolId);
    const tieneRol = byName || byId;

    // 👇 verificamos permiso específico si se pide
    const tienePermiso =
      !requirePermiso ||
      permisos.some((p: any) => p.nombre === requirePermiso && p.status === true);

    return tieneRol && tienePermiso;
  }, [user, allow, permisos, requirePermiso]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!ok) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-2">🚫 Acceso Denegado</h1>
        <p className="text-gray-600">
          No tienes permisos suficientes para acceder a esta sección.
        </p>
        <a
          href={fallback}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Volver
        </a>
      </div>
    );
  }

  return <>{children}</>;
};
