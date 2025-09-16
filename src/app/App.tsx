import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
/* import { DarkModeProvider } from "../context/DarkModeContext"; */
import { FavoritesProvider } from "../context/FavoritesContext";
import { Router } from "./router/RouterMain";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
        {/*     <DarkModeProvider> */}
              <Router />
           {/*  </DarkModeProvider> */}
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
