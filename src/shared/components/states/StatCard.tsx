import {clsx} from "clsx";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  description: string;
  isFeatured?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, description, isFeatured = false }) => {
  return (
    <div
      className={clsx(
        "group flex flex-col items-center justify-center p-8 text-center border border-gray-300 rounded-md transition-all duration-300",
        isFeatured
          ? "bg-red-500 text-white scale-105"
          : "bg-white hover:bg-red-500/10"
      )}
    >
      <div
        className={clsx(
          "rounded-full p-4 mb-4",
          isFeatured
            ? "bg-white text-red-500"
            : "bg-gray-200 text-black group-hover:bg-white group-hover:text-red-500"
        )}
      >
        {icon}
      </div>
      <p className={clsx("text-4xl font-bold mb-2", isFeatured ? "text-white" : "text-black")}>
        {value}
      </p>
      <p className={clsx("text-sm", isFeatured ? "text-gray-200" : "text-gray-500")}>
        {description}
      </p>
    </div>
  );
};

export default StatCard;
