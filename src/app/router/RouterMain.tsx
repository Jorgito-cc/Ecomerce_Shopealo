// Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { AdminLayout } from "../layout/AdminLayout";

import { HomePage } from "../../features/home/page/HomePage";
import { Contact } from "../../shared/components/Contact";
import { About } from "../../shared/components/about/About";
import { BitacoraPage } from "../../features/admin/pages/BitacoraPage";
import { Soporte } from "../../features/admin/soporte/Soporte";
import { ListaUsuarioPage } from "../../features/admin/pages/ListaUsuarioPage";
import { RegistrarEmpleadoPage } from "../../features/admin/pages/RegistrarEmpleadoPage ";
import { ProductGrid } from "../../shared/ProductGrid";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

import { RequireRole } from "../guards/RequireRole";
import { RedirectIfAuth } from "../guards/RedirectIfAuth";
import { LoginPage } from "../../features/auth/ui/LoginPage";
import { RegisterPage } from "../../features/auth/ui/RegisterPage";
import { RecuperarPasswordPage } from "../../features/auth/ui/RecuperarPasswordPage";
import { CategoriasPage } from "../../features/admin/pages/CategoriasPage";
import { ListaProductosPage } from "../../features/admin/pages/ListaProductosPage";
import { ProductCreateForm } from "../../features/admin/pages/ProductCreateForm";
import { ListaProveedoresPage } from "../../features/admin/pages/ListaProveedoresPage";
import { RegistrarProveedorPage } from "../../features/admin/pages/RegistrarProveedorPage";
import { Manual } from "../../features/admin/manual/Manual";
import ManuaTeorico from "../../features/admin/manual/ManuaTeorico";
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
          <Route path="login" element={<LoginPage />} />
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
              <RequireRole allow={["CLIENTE", 2]}>
                <CheckoutPage />
              </RequireRole>
            }
          />
        </Route>

        {/* rutas de admin aquí  mas autenticado */}
        <Route
          path="/admin"
          element={
            <RequireRole allow={["ADMINISTRADOR", 1]} /* fallback="/403" */>
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route path="bitacora" element={<BitacoraPage />} />
          <Route path="soporte" element={<Soporte />} />
                    <Route path="manual" element={<Manual />} />
                                        <Route path="manualteorico" element={<ManuaTeorico />} />


          <Route path="listausuario" element={<ListaUsuarioPage />} />
          <Route path="registrar-categoria" element={<CategoriasPage />} />

          <Route path="listar-producto" element={<ListaProductosPage />} />
          <Route path="registrar-producto" element={<ProductCreateForm />} />
          <Route path="listarproveedores" element={<ListaProveedoresPage />} />
          <Route
            path="registrar-proveedores"
            element={<RegistrarProveedorPage />}
          />

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
