import type { Category } from "../../core/entites/Category";
type Props = {
  category: Category;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 border rounded-md p-4 hover_bg-gray-100 transition cursor-pointer ">
        <div className="text-2xl ">{category.icon}</div>
        <div className="text-sm font-medium">{category.name}</div>
      </div>
    </>
  );
};
