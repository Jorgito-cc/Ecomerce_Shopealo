import type { ProductNewArrival } from '../../core/entites/ProductNewArrival';

type Props = ProductNewArrival;
export const ProductCardArrival: React.FC<Props> = ({
  title,
  description,
  image,
  href,
  large = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md group ${
        large ? "col-span-2 row-span-2" : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 text-white">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
        <a
          href={href}
          className="text-white mt-2 inline-block border-b border-white hover:text-gray-300"
        >
          Shop Now →
        </a>
      </div>
    </div>
  );
};