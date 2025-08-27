import { PhoneIcon, EnvelopeIcon  } from '@heroicons/react/24/outline'; // Iconos para los detalles de contacto

export const Contact = () => {
  return (
    <>

<div className="flex flex-col min-h-screen bg-white text-gray-800">
      
      {/* Breadcrumb de navegación */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 text-sm">
          <a href="/" className="hover:underline">Inicio</a> / <span className="text-black font-semibold">Contactanos</span>
        </p>
      </div>

      {/* Contenedor principal del formulario de contacto */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 py-8">
        
        {/* Columna de la izquierda: Detalles de contacto */}
        <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          {/* Sección "Call To Us" */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-red-500 p-2 rounded-full">
              <PhoneIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Llamanos</h3>
          </div>
          <p className="text-gray-600 mb-2">Estamos disponibles las 24 horas , los 7 dias de la semana.</p>
          <p className="text-gray-600 font-semibold mb-6">Telefono : 75568384</p>
          
          <hr className="border-gray-200 my-6" />

          {/* Sección "Write To Us" */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-red-500 p-2 rounded-full">
              <EnvelopeIcon  className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Escribenos</h3>
          </div>
          <p className="text-gray-600 mb-2">Completa nuestro formulario y te contaremos dentro de las proximas 24 horas.</p>
          <p className="text-gray-600 font-semibold">Correo Electronico : shopealo08@gmail.com</p>
          <p className="text-gray-600 font-semibold">Correo Electronico : shopealo08@gmail.com</p>
        </div>

        {/* Columna de la derecha: Formulario */}
        <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg">
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Tu Nombre *"
                className="w-full md:w-1/3 bg-gray-100 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                placeholder="Tu Correo Electronico  *"
                className="w-full md:w-1/3 bg-gray-100 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="tel"
                placeholder="Tu numero telefonoco*"
                className="w-full md:w-1/3 bg-gray-100 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <textarea
                placeholder="Tu Mensaje"
                rows={8}
                className="w-full bg-gray-100 py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 text-white font-semibold py-4 px-12 rounded-md hover:bg-red-600 transition-colors"
              >
                Envia tu Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
