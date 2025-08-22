import { useEffect, useState } from "react";
import { staticBanners } from "../infrastructure/data/StaticBanners";

export const PromoSlider = () => {
  const [index, setIndex] = useState(0);
  const banners = staticBanners;
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      {/* 
     Altura mínima de 400px en pantallas pequeñas

 480px en pantallas grandes (lg)
    */}
      <div className="relative w-full bg-black text-white rounded-lg overflow-hidden min-h-[400px] lg:min-h-[480px]">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {banners.map((b) => (
            <div
              key={b.id}
              className="min-w-full flex justify-between items-center px-10 py-12"
            >
              <div className="space-y-3 max-w-md">
                <span className="text-sm">{b.series}</span>
                <h2 className="text-4xl font-bold">{b.headline}</h2>
                <a
                  href={b.cta.href}
                  className="text-white border-b border-white hover:text-gray-300 transition"
                >
                  {b.cta.label} →
                </a>
              </div>
              <img src={b.image} alt={b.headline} className="h-52" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-red-500" : "bg-gray-400"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
