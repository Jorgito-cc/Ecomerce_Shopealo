import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { DarkModeProvider } from "../context/DarkModeContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { Router } from "./router/RouterMain";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <DarkModeProvider>
              <Router />
            </DarkModeProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>

       <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
        pauseOnHover
      />
    </>
  );
}

export default App;
