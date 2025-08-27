import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { staticCategories } from "../infrastructure/data/staticCategories";
import { CategoryCard } from "../../../shared/components/CategoryCard";

import "./style.css";
export const ByCategorySection = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 py-12">
           <hr className="mt-5 p-4"  />
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-red-500 font-medium text-sm">Categorias</span>
            <h2 className="text-3xl font-bold">seccion de categorias </h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaChevronLeft />
            </button>
            <button className="p-2 border rounded-full hover:bg-gray-100">
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto  scroll-hidden  ">
          <div className="flex gap-4 w-max px-1">
            {staticCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
        <hr className="mt-9" />
      </section>
    </>
  );
};
