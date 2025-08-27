import { useForm } from "react-hook-form";
import { useState } from "react";
import login_imagen from "../../../assets/img/imagen6.jpg";
import { ModalRecuperar } from "../ui/ModalRecuperar";
import { ModalCodigo } from "../ui/ModalCodigo";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate(); // 👈
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [showRecuperar, setShowRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState<string | null>(null);

  const handleRecuperar = (email: string) => {
    setEmailRecuperar(email);
  };

  const handleCloseModals = () => {
    setShowRecuperar(false);
    setEmailRecuperar(null);
  };

  const onSubmit = (data: LoginForm) => {
    console.log("Login:", data);
  };

  return (
    <>
      {/* Página Login */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden z-10">
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src={login_imagen}
              alt="Imagen de inicio de sesión"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Inicia sesión en Shopealoo
            </h2>
            <p className="text-gray-500 mb-8">
              Ingresa tus datos a continuación
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico o número"
                  {...register("email", {
                    required: "Campo obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: "Campo obligatorio",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres",
                    },
                  })}
                  className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-red-500 text-white font-semibold py-3 px-10 rounded-md hover:bg-red-600 transition-colors"
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={() => setShowRecuperar(true)}
                  className="text-red-500 font-semibold hover:underline text-center"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-gray-500">
              ¿No tienes una cuenta?{" "}
              <button
              onClick={() => navigate("/register")}
                className="font-semibold underline text-black"
              >
                Regístrate
              </button>
            </div>
          </div>
        </div>

        {/* Modales */}
        {showRecuperar && !emailRecuperar && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="relative bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl">
              <button
                onClick={handleCloseModals}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              >
                ❌
              </button>
              <ModalRecuperar
                onClose={handleCloseModals}
                onSend={handleRecuperar}
              />
            </div>
          </div>
        )}

        {showRecuperar && emailRecuperar && (
         <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="relative bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl">
              <button
                onClick={handleCloseModals}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              >
                ❌
              </button>
              <ModalCodigo
                email={emailRecuperar}
                onClose={handleCloseModals}
                onGuardar={handleCloseModals}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
