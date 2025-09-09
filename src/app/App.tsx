import { CartProvider } from "../context/CartContext";
import { Router } from "./router/RouterMain";

function App() {
  return (
    <>
{/*     <CartProvider> */}

      <Router />

   {/*  </CartProvider> */}
    </>
  );
}

export default App;
