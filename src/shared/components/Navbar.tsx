import { useState } from "react";
import {
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import {
  UserIcon as UserSolid,
  ShoppingBagIcon as ShoppingBagSolid,
  XCircleIcon,
  StarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const gradientStyle = {
  background: "linear-gradient(180deg, #A040A6 0%, #D85698 100%)",
};

// dentro del componente
// dentro del componente

export const Navbar = () => {
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
const [isCartOpen, setIsCartOpen] = useState(false);

const toggleCart = () => {
  setIsCartOpen((prev) => !prev);
};

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          <Link to="/">Shopealoo</Link>
        </div>

        {/* Barra de búsqueda escritorio */}
        <div className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            className="bg-gray-100 py-2 px-4 pr-10 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {/* Navegación escritorio */}
        <nav className="hidden md:flex items-center space-x-8 text-sm text-gray-700">
          <Link to="/">Inicio</Link>
          <Link to="/contactanos">Contacto</Link>
          <Link to="/sobrenosotros">Sobre nosotros</Link>
      {/*     <Link to="/login">Inicia Sesion </Link> */}
          {!isAuthenticated && <Link to="/login">Login</Link>}
        </nav>

        {/* Iconos escritorio */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <HeartIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
      <div className="relative">
  <button onClick={toggleCart}>
    <ShoppingBagIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
        {cartCount}
      </span>
    )}
  </button>

  {isCartOpen && (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-md z-50 border border-gray-200">
      <div className="p-4 max-h-96 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">Tu carrito está vacío.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="py-2 flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  ${item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span>Subtotal:</span>
          <span>
            ${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            to="/cart"
            className="text-center w-full py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            onClick={() => setIsCartOpen(false)}
          >
            Ver carrito
          </Link>
          <Link
            to="/checkout"
            className="text-center w-full py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            onClick={() => setIsCartOpen(false)}
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )}
</div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`p-1 rounded-full ${
                    isDropdownOpen ? "bg-red-500 text-white" : ""
                  }`}
                >
                  <UserSolid className="h-6 w-6" />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50"
                    style={gradientStyle}
                  >
                    <div className="py-1 text-white">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <UserSolid className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        Manage My Account
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <ShoppingBagSolid className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        My Order
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <XCircleIcon className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        My Cancellations
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <StarIcon className="mr-3 h-5 w-5 text-gray-200" /> My
                        Reviews
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Botón login/logout */}
          <button
            onClick={toggleAuth}
            className="ml-4 text-sm text-red-500 font-semibold hover:underline"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>

        {/* Botón hamburguesa (mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 pt-4 space-y-4 shadow-md border-t border-gray-200">
          {/* Buscador móvil */}
          <div className="relative">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="bg-gray-100 py-2 px-4 pr-10 rounded-md w-full focus:outline-none"
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Navegación móvil */}
          <nav className="flex flex-col gap-3 text-gray-700 text-base">
            <Link to="/">Inicio</Link>
            <Link to="/contactanos">Contacto</Link>
            <Link to="/sobrenosotros">Sobre nosotros</Link>
            <Link to="/register">Regístrate</Link>
            {!isAuthenticated && <Link to="/login">Login</Link>}
          </nav>

          {/* Íconos móviles si logueado */}
          {isAuthenticated && (
            <div className="flex gap-6 pt-4 border-t border-gray-200 items-center">
              <HeartIcon className="h-6 w-6 text-gray-700" />
              {/* 

              <div className="relative">
                <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">2</span>
              </div> */}
              <div className="relative">
                <Link to="/cart">
                  <ShoppingBagIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
              {/* Ícono usuario con dropdown en mobile */}
              <div className="relative">
                <button onClick={toggleDropdown}>
                  <UserSolid className="h-6 w-6 text-gray-700" />
                </button>
                {isDropdownOpen && (
                  <div
                    className="absolute mt-2 w-56 rounded-md shadow-lg z-50 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0"
                    style={gradientStyle}
                  >
                    <div className="py-1 text-white">
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <UserSolid className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        Manage My Account
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <ShoppingBagSolid className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        My Order
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <XCircleIcon className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        My Cancellations
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <StarIcon className="mr-3 h-5 w-5 text-gray-200" /> My
                        Reviews
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-2 text-sm hover:bg-pink-600/40"
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-200" />{" "}
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
