import { Navbar } from "../../shared/components/Navbar";

import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-neutral-100 text-shadow-gray-900">
        {/*   <TopHeader /> */}
        <Navbar />

        <main className="flex-1 px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
