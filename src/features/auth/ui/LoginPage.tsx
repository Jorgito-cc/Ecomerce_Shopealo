import React from 'react'

export const LoginPage = () => {
  return (
    <>
<div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      {/* Contenedor principal con dos columnas */}
      <div className="flex w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Columna de la imagen (visible en pantallas medianas y grandes) */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://placehold.co/600x400/9871db/ffffff?text=E-commerce+Image"
            alt="Shopping cart with phone"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Columna del formulario */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold mb-2">Log in to Exclusive</h2>
          <p className="text-gray-500 mb-8">Enter your details below</p>

          {/* Formulario de inicio de sesión */}
          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email or Phone Number"
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Contenedor del botón y el enlace */}
            <div className="flex justify-between items-center mt-6">
              <button
                type="submit"
                className="bg-red-500 text-white font-semibold py-3 px-10 rounded-md hover:bg-red-600 transition-colors"
              >
                Log In
              </button>
              <a href="#" className="text-red-500 font-semibold hover:underline">
                Forget Password?
              </a>
            </div>
          </form>

          {/* Enlace para registrarse */}
          <div className="mt-8 text-center text-gray-500">
            Already have account?{' '}
            <a href="#" className="font-semibold underline text-black">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}
