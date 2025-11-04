// ✅ Hook para consultar permisos desde el localStorage
export const usePermisos = () => {
  const permisos = JSON.parse(localStorage.getItem("role_permisos") || "[]");

  /**
   * Verifica si el usuario actual tiene un permiso activo
   * @param nombrePermiso string — Ej: "CREAR_PRODUCTO"
   * @returns boolean
   */
  const tienePermiso = (nombrePermiso: string): boolean => {
    const permiso = permisos.find((p: any) => p.nombre === nombrePermiso);
    return permiso ? permiso.status === true : false;
  };

  return { tienePermiso };
};
