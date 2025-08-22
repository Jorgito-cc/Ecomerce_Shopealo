import React from 'react'

export const OurStory = () => {
  return (
    <>

    <div className="flex flex-col md:flex-row items-center justify-center container mx-auto px-4 py-16">
      
      {/* Columna de texto */}
      <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0">
        {/* Breadcrumb de navegación */}
        <p className="text-gray-500 text-sm mb-4">
          <a href="/" className="hover:underline">Iniico</a> / <span className="text-black font-semibold">Sobre nosotros</span>
        </p>
        
        {/* Título y texto de la historia */}
        <h2 className="text-4xl md:text-5xl font-semibold mb-6">
          Sobre nosotros 
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nulla, pariatur optio ipsam tempora voluptas facilis, dolores reprehenderit ipsum enim doloribus molestiae, nisi eos culpa dignissimos veritatis numquam aperiam perferendis?.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab voluptas reprehenderit odit quae eveniet pariatur vitae laboriosam praesentium reiciendis sunt facilis, at perferendis iste debitis distinctio quo. Quidem, aspernatur est.
        </p>
      </div>

      {/* Columna de la imagen */}
      <div className="md:w-1/2">
        <img
          src="https://placehold.co/600x400/9871db/ffffff?text=Our+Story"
          alt="Two women smiling and shopping"
          className="rounded-lg shadow-lg object-cover w-full h-auto"
        />
      </div>

    </div>

    </>
  )
}
