import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo_google_play  from '../../assets/img/imagen1.png';
import logo_OS from '../../assets/img/imagen3.png'
export const Footer = () => {
  return (
    <>
<footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Sección 1: Exclusive**^^%&*** */}
          <div>  
            <h3 className="text-2xl font-bold mb-4">Exclusivo</h3>
            <h4 className="text-xl font-semibold mb-2">Subscribite</h4>
            <p className="text-sm text-gray-400 mb-4">Obten el 10% en tu primera orden </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Envianos tu Correo Electronico"
                className="bg-transparent border border-white text-white p-2 pr-10 w-full focus:outline-none focus:border-gray-400 transition"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Sección 2: Spoyo */}
          <div>
            <h3 className="text-xl font-bold mb-4">Localizanos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Avenida siempre viva 123456789</li>
              <li>shopealo08@gmail.com</li>
              <li>75568384</li>
            </ul>
          </div>

          {/* Sección 3: Account */}
          <div>
            <h3 className="text-xl font-bold mb-4">Cuenta</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Mi Cuenta</a></li>
              <li><a href="#" className="hover:text-white transition">Inicia Sesscion / Registrate</a></li>
              <li><a href="#" className="hover:text-white transition">Carrito</a></li>
              <li><a href="#" className="hover:text-white transition">Lista de Deseos </a></li>
              <li><a href="#" className="hover:text-white transition">Tienda </a></li>
            </ul>
          </div>

          {/* Sección 4: Quick Link */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces de Informacion </h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Politica de privacidad</a></li>
              <li><a href="#" className="hover:text-white transition">Terminos de uso</a></li>
              <li><a href="#" className="hover:text-white transition">Preguintas Frecuentes </a></li>
              <li><a href="#" className="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>

          {/* Sección 5: Download App */}
          <div>
            <h3 className="text-xl font-bold mb-4">Descarga la  App</h3>
            <p className="text-sm text-gray-400 mb-2">App totalmente gratuita!!1</p>
            <div className="flex items-center gap-4 mb-4">
              {/* Reemplaza src con la ruta a tu QR code */}
              <img src="/path/to/your/qr_code.png" alt="QR Code" className="w-20 h-20" />
              <div>
                {/* Reemplaza src con la ruta a las imágenes de Google Play y App Store */}
                <a href="#" className="block mb-2"><img src={Logo_google_play} alt="Google Play" className="w-28" /></a>
                <a href="#"><img src={logo_OS} alt="App Store" className="w-28" /></a>
              </div>
            </div>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" aria-label="Facebook" className="hover:text-white transition"><FaFacebookF className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition"><FaTwitter className="w-6 h-6" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white transition"><FaInstagram className="w-6 h-6" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition"><FaLinkedinIn className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
        &copy; Shopelaoo - 2025.
      </div>
    </footer>

    </>
  )
}
