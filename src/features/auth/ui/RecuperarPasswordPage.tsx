import { useState } from "react";
import { ModalRecuperar } from "../ui/ModalRecuperar";
import { ModalCodigo } from "../ui/ModalCodigo";
export const RecuperarPasswordPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [showCodigo, setShowCodigo] = useState(false);

  const handleEnviarCorreo = (emailIngresado: string) => {
    setEmail(emailIngresado);
    setShowCodigo(true);
  };

  const handleClose = () => {
    setEmail(null);
    setShowCodigo(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
        {email && showCodigo ? (
          <ModalCodigo email={email} onClose={handleClose} onGuardar={handleClose} />
        ) : (
          <ModalRecuperar onClose={handleClose} onSend={handleEnviarCorreo} />
        )}
      </div>
    </div>
  );
};