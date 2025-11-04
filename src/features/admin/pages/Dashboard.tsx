// src/features/admin/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { getUsers } from "../../../api/userApi";
import { getProducts } from "../../../api/productApi";
import { getAllOrders } from "../../../api/orderApiAdmin";
import { getFavorites } from "../../../api/favoriteApi";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaHeart } from "react-icons/fa";

export const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [users, products, orders, favorites] = await Promise.all([
          getUsers(),
          getProducts(),
          getAllOrders(),
          getFavorites(),
        ]);
        setUserCount(users.length);
        setProductCount(products.length);
        setOrderCount(orders.length);
        setFavoriteCount(favorites.length);
      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];

  const stats = [
    { title: "Usuarios", value: userCount, icon: <FaUsers className="text-indigo-600" /> },
    { title: "Productos", value: productCount, icon: <FaBoxOpen className="text-yellow-500" /> },
    { title: "Órdenes", value: orderCount, icon: <FaShoppingCart className="text-green-500" /> },
    { title: "Favoritos", value: favoriteCount, icon: <FaHeart className="text-red-500" /> },
  ];

  const pieData = [
    { name: "Usuarios", value: userCount },
    { name: "Productos", value: productCount },
    { name: "Órdenes", value: orderCount },
    { name: "Favoritos", value: favoriteCount },
  ];

  const lineData = [
    { name: "Usuarios", value: userCount },
    { name: "Productos", value: productCount },
    { name: "Órdenes", value: orderCount },
    { name: "Favoritos", value: favoriteCount },
  ];

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Cargando Dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Panel de Administración</h1>

      {/* ====== TARJETAS ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
              </div>
              <div className="text-3xl">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ====== GRAFICOS ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Resumen General</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pastel */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Distribución de Datos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== Gráfico de Línea ====== */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Evolución de Métricas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
