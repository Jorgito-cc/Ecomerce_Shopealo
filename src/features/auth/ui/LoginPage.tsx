// src/pages/auth/LoginPage.tsx
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login_imagen from "../../../assets/img/imagen6.jpg";
import { ModalRecuperar } from "../ui/ModalRecuperar";
import { ModalCodigo } from "../ui/ModalCodigo";
 // <-- ajusta la ruta si difiere

// Endpoints de auth
import {
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../../api/auth";
import { useAuth } from "../../../context/AuthContext";

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // usa tu AuthContext (setea user, guarda token, etc.)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({ mode: "onTouched" });

  const [showRecuperar, setShowRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // === LOGIN ===
const onSubmit = async (data: LoginForm) => {
  setApiError(null);
  try {
    await login({
      email: data.email.trim().toLowerCase(), // 👈
      password: data.password.trim(),         // 👈
    });
    navigate("/");
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "No se pudo iniciar sesión";
    setApiError(msg);
    setError("email", { message: "Revisa tu correo o contraseña" });
    setError("password", { message: "Revisa tu correo o contraseña" });
  }
};


  // === RECUPERAR (paso 1: enviar correo) ===
  const handleRecuperar = async (email: string) => {
    await forgotPasswordRequest({ email }); // si falla lanzará error que captura el modal
    setEmailRecuperar(email); // abre el modal del código
  };

  // === RESET (paso 2: enviar código + nueva contraseña) ===
  const handleResetPassword = async (code: string, password: string) => {
    if (!emailRecuperar) return;
    await resetPasswordRequest({ email: emailRecuperar, code, password });
    // Éxito
    setShowRecuperar(false);
    setEmailRecuperar(null);
    navigate("/login");
  };

  const handleCloseModals = () => {
    setShowRecuperar(false);
    setEmailRecuperar(null);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
        <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden z-10">
          {/* Imagen */}
          <div className="w-full md:w-1/2 h-64 md:h-auto">
            <img
              src={login_imagen}
              alt="Imagen de inicio de sesión"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Formulario */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Inicia sesión en Shopealoo
            </h2>
            <p className="text-gray-500 mb-4">Ingresa tus datos a continuación</p>

            {apiError && (
              <div className="mb-4 text-sm text-red-600">{apiError}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  {...register("email", {
                    required: "Campo obligatorio",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Correo inválido",
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
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
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
                  disabled={isSubmitting}
                  className="bg-red-500 text-white font-semibold py-3 px-10 rounded-md hover:bg-red-600 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
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

        {/* MODALES */}
        {showRecuperar && !emailRecuperar && (
          <ModalRecuperar
            onClose={handleCloseModals}
            onSend={handleRecuperar}
          />
        )}

        {showRecuperar && emailRecuperar && (
          <ModalCodigo
            email={emailRecuperar}
            onClose={handleCloseModals}
            onGuardar={handleResetPassword}
          />
        )}
      </div>
    </>
  );
};
