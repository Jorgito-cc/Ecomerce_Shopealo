import { FaShippingFast, FaHeadset, FaShieldAlt } from "react-icons/fa";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

 const features: Feature[] = [
  {
    icon: <FaShippingFast className="text-white text-2xl" />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $100",
  },
  {
    icon: <FaHeadset className="text-white text-2xl" />,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: <FaShieldAlt className="text-white text-2xl" />,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

export const ServiceFeatures = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center border border-gray-300 p-6 rounded-lg shadow-sm"
          >
            <div className="bg-black rounded-full p-4 mb-4 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-sm font-bold">{feature.title}</h3>
            <p className="text-xs text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

