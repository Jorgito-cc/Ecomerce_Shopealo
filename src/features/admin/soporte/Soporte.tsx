
import nadie from "../../../assets/img/imagenv1.jpg"
import jorge from "../../../assets/img/jorge.jpeg";
import jose from "../../../assets/img/jose.jpg";
import andres from "../../../assets/img/andres.jpg";
import carlos from "../../../assets/img/carlos.jpg";


import { SoporteCard } from "./SoporteCard";
export const Soporte = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-white">
        Soporte Tecnicosss
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        <SoporteCard
          nombre="Jorge Choque Calle "
          email="jorgitochoque007@gmail.com"
          telefono="+591 75568384"
          whatsapp="59175568384"
          foto={jorge}
        />
        <SoporteCard
          nombre="Beimar Meza Mamani "
          email="beimar@gmail.com"
          telefono="+591 69245917"
          whatsapp="59169245917"
          foto={nadie}
        />
        <SoporteCard
          nombre="Cristian Gabriel Gedalge Cayhuara"
          email="cristian34@gmail.com"
          telefono="+591 77074673"
          whatsapp="59177074673"
          foto={nadie}
        />
         <SoporteCard
          nombre="Carlos Alberto Rodriguez Mansilla"
          email="carlosalberto@gmail.com"
          telefono="+591 71025695"
          whatsapp="59171025695"
          foto={carlos}
        />
         <SoporteCard
          nombre="Andres Leonardo Callisaya Quispe "
          email="andreleonardp@gmail.com"
          telefono="+591 77084158"
          whatsapp="59177084158"
          foto={andres}
        />
         <SoporteCard
          nombre="jose victor ugarteche ancieta"
          email="josevistor@gmail.com"
          telefono="+591 63560825"
          whatsapp="59163560825"
          foto={jose}
        />
      </div>
    </div>
  );
};