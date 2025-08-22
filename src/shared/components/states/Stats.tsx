import React from "react";
import StatCard from "./StatCard";
import { StoreIcon, DollarIcon, BoxIcon, BagIcon } from "./icons";

export const Stats: React.FC = () => {
  const statsData = [
    { icon: <StoreIcon className="w-10 h-10" aria-label="Store icon" />, value: "10.5k", description: "Sellers active on our site" },
    { icon: <DollarIcon className="w-10 h-10" aria-label="Dollar icon" />, value: "33k", description: "Monthly Product Sales", isFeatured: true },
    { icon: <BoxIcon className="w-10 h-10" aria-label="Box icon" />, value: "45.5k", description: "Customers active on our site" },
    { icon: <BagIcon className="w-10 h-10" aria-label="Bag icon" />, value: "25k", description: "Annual gross sales on our site" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};


