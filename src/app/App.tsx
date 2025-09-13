import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Router } from "./router/RouterMain";

function App() {
  return (
    <>
    <CartProvider> 
<AuthProvider>

      <Router />
</AuthProvider>

    </CartProvider> 
    </>
  );
}

export default App;
