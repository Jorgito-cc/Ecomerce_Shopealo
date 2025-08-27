import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser, FaBox, FaClipboardList, FaCog,
  FaChevronLeft, FaChevronRight, FaChevronDown, FaSun, FaMoon
} from "react-icons/fa";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const location = useLocation();

  const toggleDropdown = (section: string) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`min-h-screen bg-[#e0e0e0] border-r border-gray-300 shadow-md flex flex-col transition-all duration-300 ${isOpen ? "w-72" : "w-20"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h1 className="font-bold text-indigo-600">{isOpen ? "Shoealo.Admin" : "🛒"}</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-thin">
        {/* Usuario */}
        <div>
          <button
            onClick={() => toggleDropdown("usuario")}
            className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded"
          >
            <span className="flex gap-2 items-center text-sm">
              <FaUser /> {isOpen && "Usuario"}
            </span>
            {isOpen && <FaChevronDown />}
          </button>
          {openDropdown === "usuario" && (
            <div className="pl-6 mt-2 space-y-1">
              <Link to="/admin/bitacora" className={`${isActive("/admin/bitacora") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Bitácora</Link>
              <Link to="/admin/listausuario" className={`${isActive("/admin/listausuario") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Lista de Usuarios</Link>
              <Link to="/admin/registrar-empleado" className={`${isActive("/admin/registrar-empleado") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Registrar Empleado</Link>
            </div>
          )}
        </div>

        {/* Inventario */}
        <div>
          <button
            onClick={() => toggleDropdown("producto")}
            className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded"
          >
            <span className="flex gap-2 items-center text-sm">
              <FaBox /> {isOpen && "Inventario"}
            </span>
            {isOpen && <FaChevronDown />}
          </button>
          {openDropdown === "producto" && (
            <div className="pl-6 mt-2 space-y-1">
              <Link to="/admin/registrar-producto" className={`${isActive("/admin/registrar-producto") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Registrar Producto</Link>
              <Link to="/admin/registrar-categoria" className={`${isActive("/admin/registrar-categoria") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Registrar Categoría</Link>
            </div>
          )}
        </div>

        {/* Ventas */}
        <div>
          <button
            onClick={() => toggleDropdown("ventas")}
            className="w-full flex items-center justify-between text-left px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded"
          >
            <span className="flex gap-2 items-center text-sm">
              <FaClipboardList /> {isOpen && "Ventas"}
            </span>
            {isOpen && <FaChevronDown />}
          </button>
          {openDropdown === "ventas" && (
            <div className="pl-6 mt-2 space-y-1">
              <Link to="/admin/ventas-vendidas" className={`${isActive("/admin/ventas-vendidas") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Ventas Vendidas</Link>
              <Link to="/admin/detalle-venta" className={`${isActive("/admin/detalle-venta") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>Detalle Venta</Link>
            </div>
          )}
        </div>

        {/* Configuración */}
        <Link to="/admin/soporte" className={`${isActive("/admin/soporte") ? "text-indigo-600 font-bold" : "hover:text-indigo-500"} block`}>
          <FaCog className="inline mr-2" /> {isOpen && "Soporte"}
        </Link>

        {/* Dark mode */}
        <div className="mt-6 flex items-center gap-2 px-4">
          {isOpen && <span className="text-sm">Dark mode</span>}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-auto px-3 py-1 rounded-full ${darkMode ? "bg-yellow-500" : "bg-gray-300"}`}
          >
            {darkMode ? <FaSun className="text-white" /> : <FaMoon className="text-gray-700" />}
          </button>
        </div>
      </div>
    </aside>
  );
};
