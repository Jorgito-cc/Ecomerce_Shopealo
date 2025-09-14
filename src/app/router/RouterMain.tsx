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
import { ProductGrid } from "../../shared/ProductGrid";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

import { RequireRole } from "../guards/RequireRole";
import { RedirectIfAuth } from "../guards/RedirectIfAuth";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Publico  */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contactanos" element={<Contact />} />
          <Route path="sobrenosotros" element={<About />} />
          {/* Evita que usuarios logueados vean login/register */}
          <Route
            path="login"
            element={
              <RedirectIfAuth>
                <LoginPage />
              </RedirectIfAuth>
            }
          />
          <Route
            path="register"
            element={
              <RedirectIfAuth>
                <RegisterPage />
              </RedirectIfAuth>
            }
          />


          <Route path="recuperar" element={<RecuperarPasswordPage />} />
          <Route path="all-products" element={<ProductGrid />} />
          <Route path="cart" element={<CartPage />} />
          {/* solo cliente  por nombre o id  */}
          <Route
            path="checkout"
            element={
              <RequireRole allow={['CLIENTE', 2]}>
                <CheckoutPage />
              </RequireRole>
            }
          />
        </Route>

          {/* rutas de admin aquí  mas autenticado */}
       <Route
          path="/admin"
          element={
            <RequireRole allow={['ADMINISTRADOR', 1]} /* fallback="/403" */>
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route path="bitacora" element={<BitacoraPage />} />
          <Route path="soporte" element={<Soporte />} />
          <Route path="listausuario" element={<ListaUsuarioPage />} />
          <Route
            path="registrar-empleado"
            element={<RegistrarEmpleadoPage />}
          />
        </Route>
        
        {/* <Route path="/403" element={<Forbidden />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
