import React, { useState } from 'react';
import {
  HeartIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'; // Iconos de contorno

import {
  HeartIcon as HeartSolid,
  ShoppingBagIcon as ShoppingBagSolid,
  UserIcon as UserSolid,
  StarIcon as StarOutline,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid'; // Iconos sólidos y del dropdown
import { Link } from 'react-router-dom';

// Definimos la paleta de colores del gradiente para el dropdown
// Tailwind por defecto no tiene este tipo de gradiente,
// así que creamos un estilo inline.
const gradientStyle = {
  background: 'linear-gradient(180deg, #A040A6 0%, #D85698 100%)',
};


export const Navbar = () => {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para cambiar el estado de autenticación
  const handleToggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
    setIsDropdownOpen(false); // Cierra el dropdown al cambiar de estado
  };

  // Función para abrir/cerrar el dropdown del perfil
  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">Shopealoo</div>

        {/* Links de navegación */}
        <nav className="hidden md:flex flex-grow justify-center space-x-12">
          <Link to='/' className="hover:text-gray-500 transition-colors">Inicio</Link>
          <Link to='/contactanos' className="hover:text-gray-500 transition-colors">Contacto</Link>
          <Link to='/sobrenosotros' className="hover:text-gray-500 transition-colors">Sobre nosotros</Link>
          < Link to='/login' className="hover:text-gray-500 transition-colors">Registrate</Link>
        </nav>

        {/* Búsqueda e iconos */}
        <div className="flex items-center space-x-4">
          {/* Campo de búsqueda */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Que estas buscandooo?"
              className="bg-gray-100 py-2 px-4 rounded-md w-60 pr-10 focus:outline-none"
            />
            <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center space-x-4 relative">
            {/* Botón de autenticación (Login/Logout) */}
            <button
              onClick={handleToggleAuth}
              className="hidden md:block text-sm text-gray-500 hover:underline"
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
            <div className="flex space-x-4">
              
              {/* Icono de corazón (Wishlist) */}
              <button>
                <HeartIcon className="h-6 w-6" />
              </button>

              {/* Icono del carrito de compras */}
              <div className="relative">
                <button className="relative">
                  <ShoppingBagIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    2
                  </span>
                </button>
              </div>
              
              {/* Contenedor del perfil y dropdown (solo visible si está autenticado) */}
              {isAuthenticated && (
                <div className="relative">
                  <button onClick={handleToggleDropdown} className={`p-1 rounded-full ${isDropdownOpen ? 'bg-red-500 text-white' : ''}`}>
                    <UserSolid className="h-6 w-6" />
                  </button>

                  {/* Dropdown del perfil */}
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                      style={gradientStyle}
                    >
                      <div className="py-1">
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700/50">
                          <UserSolid className="mr-3 h-5 w-5 text-gray-200" /> Manage My Account
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700/50">
                          <ShoppingBagSolid className="mr-3 h-5 w-5 text-gray-200" /> My Order
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700/50">
                          <XCircleIcon className="mr-3 h-5 w-5 text-gray-200" /> My Cancellations
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700/50">
                          <StarOutline className="mr-3 h-5 w-5 text-gray-200" /> My Reviews
                        </a>
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-white hover:bg-gray-700/50">
                          <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-200" /> Logout
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>

    </>
  )
}

