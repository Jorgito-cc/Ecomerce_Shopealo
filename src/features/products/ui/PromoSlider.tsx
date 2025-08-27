import { useEffect, useState } from "react";
import { staticBanners } from "../infrastructure/data/StaticBanners";
import type { Banner } from "../../../core/entites/Banner";

export const PromoSlider = () => {
  const [index, setIndex] = useState<number>(0);
  const banners: Banner[] = staticBanners;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full bg-black text-white rounded-lg overflow-hidden min-h-[420px] md:min-h-[500px] lg:min-h-[580px]">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((b) => (
          <div
            key={b.id}
            className="min-w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-10 gap-8"
          >
            {/* Texto */}
            <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
              <span className="text-base md:text-lg text-gray-400">{b.series}</span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {b.headline}
              </h2>
              <a
                href={b.cta.href}
                className="inline-block text-white border-b border-white hover:text-gray-300 transition"
              >
                {b.cta.label} →
              </a>
            </div>

            {/* Imagen */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={b.image}
                alt={b.headline}
                className="w-full max-w-sm md:max-w-xl object-contain"
              />
            </div>
        
          </div>
        ))}

      </div>

      {/* Indicadores */}
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
  );
};
