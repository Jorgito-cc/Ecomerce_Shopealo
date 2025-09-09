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
import { ListaUsuarioPage } from "../../features/admin/pages/ListaUsuarioPage";
import { RegistrarEmpleadoPage } from "../../features/admin/pages/RegistrarEmpleadoPage ";
import { RegisterPage } from "../../features/auth/ui/RegisterPage";
import { RecuperarPasswordPage } from "../../features/auth/ui/RecuperarPasswordPage";
import { ProductGrid } from '../../shared/ProductGrid';
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* Ruta para "/" */}
          <Route path="contactanos" element={<Contact />} />
          <Route path="sobrenosotros" element={<About />} />
          <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />

                    <Route path="recuperar" element={<RecuperarPasswordPage />} />
                     <Route path="all-products" element={<ProductGrid />} />

                                  <Route path="cart" element={<CartPage />} />
                                               <Route path="checkout" element={<CheckoutPage />} />

        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          {/* rutas de admin aquí */}
          <Route path="bitacora" element={<BitacoraPage />} />
          <Route path="soporte" element={<Soporte />} />
          <Route path="listausuario" element={<ListaUsuarioPage />} />
          <Route
            path="registrar-empleado"
            element={<RegistrarEmpleadoPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
