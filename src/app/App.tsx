import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { DarkModeProvider } from "../context/DarkModeContext";
import { Router } from "./router/RouterMain";

function App() {
  return (
    <>
      <CartProvider>
        <AuthProvider>
          <DarkModeProvider>

          <Router />
          </DarkModeProvider>
        </AuthProvider>
      </CartProvider>
    </>
  );
}

export default App;
