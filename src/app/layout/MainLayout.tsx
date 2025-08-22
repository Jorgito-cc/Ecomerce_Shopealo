import { Navbar } from "../../shared/components/Navbar";
import { TopHeader } from "../../shared/components/TopHeader";
import { Outlet } from "react-router-dom";
import { Footer } from "../../shared/components/Footer";

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-neutral-100 text-shadow-gray-900">
        <TopHeader />
        <Navbar />
      
        <main className="flex-1 px-4 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
