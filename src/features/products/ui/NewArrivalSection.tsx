import { ProductCardArrival } from '../../../shared/components/ProductCardArrival';
import { staticNewArrivals } from '../infrastructure/data/staticNewArrivals';

export default function NewArrivalSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <span className="text-red-500 font-medium text-sm"> Destacados</span>
        <h2 className="text-3xl font-bold">Productos Desctacados </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px]">
        {staticNewArrivals.map((item, idx) => (
          <ProductCardArrival
            key={item.id}
            {...item}
            large={idx === 0} // El primero (PS5) es grande
          />
        ))}
      </div>
              <hr className="mt-9" />
    </section>
  );
}
