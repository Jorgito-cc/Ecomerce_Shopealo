import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../context/AuthContext"; // ← ajusta si tu ruta difiere
import register_imagen from "../../../assets/img/imagen6.jpg";

type RegisterForm = {
  nombre: string;
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerApi } = useAuth(); // ← usa tu AuthContext

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterForm>({ mode: "onTouched" });

  const onSubmit = async (data: RegisterForm) => {
    try {
      // Mapeo al DTO esperado por tu backend: RegisterRequest
  await registerApi({
  nombre: data.nombre,   // 👈 no "name"
  email: data.email,
  password: data.password,
  rolId: 2,             // 👈 dale un rol por defecto si es necesario
});

      // Si registerRequest guarda token + user (según tu AuthContext),
      // te dejamos logueado y te llevamos al home / dashboard.
      navigate("/");
    } catch (err: any) {
      // Intenta leer mensaje del backend
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "No se pudo crear la cuenta";

      // Mensaje general arriba
      setError("root", { message: msg });

      // Opcional: marcar campos específicos si tu API manda errores por campo
      const fieldErrors = err?.response?.data?.errors;
      if (fieldErrors?.email) setError("email", { message: fieldErrors.email });
      if (fieldErrors?.name) setError("nombre", { message: fieldErrors.name });
      if (fieldErrors?.password) setError("password", { message: fieldErrors.password });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Imagen lateral */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={register_imagen}
            alt="Imagen de registro"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Crear una cuenta</h2>
          <p className="text-gray-500 mb-6">Ingresa tus datos a continuación</p>

          {/* Error general del backend */}
       
          {errors.root?.message && (
            <div className="mb-4 text-sm text-red-600">{errors.root.message}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                {...register("nombre", { required: "El nombre es obligatorio" })}
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Correo no válido",
                  },
                })}
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
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
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              className="w-full bg-white text-gray-700 border border-gray-300 font-semibold py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
              onClick={() => {
                // Aquí integra tu flujo OAuth (Google) cuando lo tengas:
                // window.location.href = `${API_BASE_URL}/auth/google`;
                console.log("Google SignUp pendiente de integrar");
              }}
            >
              <FcGoogle className="h-6 w-6" />
              <span>Registrarse con Google</span>
            </button>
          </div>

          <div className="mt-8 text-center text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold underline text-black"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
