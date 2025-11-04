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
import { ProductDetail } from "../../shared/ProductDetail";
import { FavoritesPage } from "../../pages/FavoritesPage";
import { Backup } from "../../features/admin/pages/Backup";
import { OrderSuccessPage } from "../../pages/OrderSuccessPage";
import OrdersAdminPage from "../../features/admin/pages/OrdersAdminPage";
import { ReportesPage } from "../../pages/ReportesPage";
import { MyAccountPage } from "../../pages/MyAccountPage";
import { RecomendacionesPage } from "../../features/admin/pages/RecomendacionesPage";
import { RolesPage } from "../../features/admin/pages/RolesPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================== PÚBLICAS =================== */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contactanos" element={<Contact />} />
          <Route path="sobrenosotros" element={<About />} />

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
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="recomendaciones/:id" element={<RecomendacionesPage />} />
          <Route path="recomendaciones" element={<RecomendacionesPage />} />

          {/* CLIENTE AUTENTICADO */}
          <Route
            path="checkout"
            element={
              <RequireRole allow={["CLIENTE", 2]}>
                <CheckoutPage />
              </RequireRole>
            }
          />
          <Route path="success" element={<OrderSuccessPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="misordenes" element={<ReportesPage />} />
          <Route path="micuenta" element={<MyAccountPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* =================== ADMIN =================== */}
        <Route
          path="/admin"
          element={
            <RequireRole allow={["ADMINISTRADOR", 1]}>
              <AdminLayout />
            </RequireRole>
          }
        >
          {/* =================== Módulos con control de permisos =================== */}

          {/* 📊 Bitácora */}
          <Route path="bitacora" element={<BitacoraPage />} />

          {/* 🧩 Soporte / Manuales */}
          <Route path="soporte" element={<Soporte />} />
          <Route path="manual" element={<Manual />} />
          <Route path="manualteorico" element={<ManuaTeorico />} />

          {/* 👥 Usuarios */}
          <Route
            path="listausuario"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="EDITAR_USUARIO">
                <ListaUsuarioPage />
              </RequireRole>
            }
          />

          {/* 📦 Categorías */}
          <Route
            path="registrar-categoria"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="CREAR_CATEGORIA">
                <CategoriasPage />
              </RequireRole>
            }
          />

          {/* 🛒 Productos */}
          <Route
            path="listar-producto"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="CREAR_PRODUCTO">
                <ListaProductosPage />
              </RequireRole>
            }
          />
          <Route
            path="registrar-producto"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="CREAR_PRODUCTO">
                <ProductCreateForm />
              </RequireRole>
            }
          />

          {/* 🚚 Proveedores */}
          <Route
            path="listarproveedores"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="EDITAR_PRODUCTO">
                <ListaProveedoresPage />
              </RequireRole>
            }
          />
          <Route
            path="registrar-proveedores"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="CREAR_DESCUENTO">
                <RegistrarProveedorPage />
              </RequireRole>
            }
          />

          {/* 🧾 Órdenes */}
          <Route
            path="ordenesAdmin"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="EDITAR_USUARIO">
                <OrdersAdminPage />
              </RequireRole>
            }
          />

          {/* 🔐 Roles y permisos */}
          <Route
            path="privilegio"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="EDITAR_ROL">
                <RolesPage />
              </RequireRole>
            }
          />

          {/* 👨‍💼 Empleados */}
          <Route
            path="registrar-empleado"
            element={
              <RequireRole allow={["ADMINISTRADOR", 1]} requirePermiso="CREAR_ROL">
                <RegistrarEmpleadoPage />
              </RequireRole>
            }
          />

          {/* 💾 Backup (sin permisos adicionales) */}
          <Route path="backup" element={<Backup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
