import { staticFullService } from "../infrastructure/data/staticFullService"

export const FullServices = () => {
  return (
    <>
<section className="w-full px-4 py-10 md:py-14 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
        {staticFullService.map((service) => (
          <div key={service.id} className="text-center flex flex-col items-center max-w-xs">
            <div className="bg-black rounded-full p-4 relative">
              <div className="bg-gray-300 rounded-full absolute -inset-1 z-[-1]" />
              {service.icon}
            </div>
            <h3 className="text-md font-bold mt-4">{service.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{service.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
    
    </>
  )
}
