
import cristian from "../../../assets/img/imagen1.png"
import jorge from "../../../assets/img/imagen1.png";
import { SoporteCard } from "./SoporteCard";
export const Soporte = () => {
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-white">
        Soporte Tecnico
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
          telefono="+591 75568384"
          whatsapp="59175568384"
          foto={jorge}
        />
        <SoporteCard
          nombre="Cristian Gabriel Gedalge Cayhuara"
          email="cristian34@gmail.com"
          telefono="+591 77074673"
          whatsapp="59177074673"
          foto={cristian}
        />
         <SoporteCard
          nombre="Carlos Alberto Rodriguez Mansilla"
          email="carlosalberto@gmail.com"
          telefono="+591 77074673"
          whatsapp="59177074673"
          foto={cristian}
        />
         <SoporteCard
          nombre="Andres Leonardo Callisaya Quispe "
          email="andreleonardp@gmail.com"
          telefono="+591 77074673"
          whatsapp="59177074673"
          foto={cristian}
        />
         <SoporteCard
          nombre="jose victor ugarteche ancieta"
          email="josevistor@gmail.com"
          telefono="+591 77074673"
          whatsapp="59177074673"
          foto={cristian}
        />
      </div>
    </div>
  );
};