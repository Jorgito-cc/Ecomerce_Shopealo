// Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { AdminLayout } from "../layout/AdminLayout";

import { HomePage } from "../../features/home/page/HomePage";
import { Contact } from "../../shared/components/Contact";
import { About } from "../../shared/components/about/About";
import { LoginPage } from "../../features/auth/ui/LoginPage";
import { BitacoraPage } from "../../features/admin/pages/BitacoraPage";
import { Soporte } from "../../features/admin/soporte/Soporte";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* Ruta para "/" */}
          <Route path="contactanos" element={<Contact />} />
          <Route path="sobrenosotros" element={<About />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {/* rutas de admin aquí */}
                  <Route path="bitacora" element={<BitacoraPage />} />
                    <Route path="soporte" element={<Soporte/>} />
                  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
