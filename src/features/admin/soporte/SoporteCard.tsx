import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";

type SoporteCardProps = {
  nombre: string;
  email: string;
  telefono: string;
  whatsapp: string;
  foto: string;
};

export const SoporteCard: React.FC<SoporteCardProps> = ({
  nombre,
  email,
  telefono,
  whatsapp,
  foto,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-sm w-full flex flex-col items-center text-center transition hover:scale-105 hover:shadow-lg">
      <img
        src={foto}
        alt={`Foto de ${nombre}`}
        className="w-28 h-28 rounded-full object-cover shadow mb-4 border-4 border-indigo-600"
      />
      <h2 className="text-xl font-semibold text-indigo-700 dark:text-white mb-2">{nombre}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-1 flex items-center gap-2">
        <FaEnvelope /> {email}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
        <FaPhone /> {telefono}
      </p>
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded flex items-center gap-2"
      >
        <FaWhatsapp /> WhatsApp
      </a>
    </div>
  );
};
