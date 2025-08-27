
export const NotFound = () => {
  return (
    <>

<div className="flex flex-col min-h-screen bg-white text-gray-800">
      
      {/* Breadcrumb de navegación */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 text-sm">
          <a href="/" className="hover:underline">Home</a> / <span className="text-black font-semibold">404 Error</span>
        </p>
      </div>

      {/* Contenido principal de la página de error */}
      <div className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4">
          404 Not Found
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-md">
          Your visited page not found. You may go home page.
        </p>
        
        {/* Botón para volver a la página de inicio */}
        <a 
          href="/"
          className="bg-red-500 text-white font-semibold py-4 px-12 rounded-md hover:bg-red-600 transition-colors"
        >
          Back to home page
        </a>
      </div>

    </div>
    </>
  )
}
