import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // 👈
import { FcGoogle } from "react-icons/fc";
import register_imagen from "../../../assets/img/imagen6.jpg";

type RegisterForm = {
  nombre: string;
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const navigate = useNavigate(); // 👈
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    console.log("Datos registrados:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={register_imagen}
            alt="Imagen de registro"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Crear una cuenta</h2>
          <p className="text-gray-500 mb-8">Ingresa tus datos a continuación</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nombre completo"
                {...register("nombre", { required: "El nombre es obligatorio" })}
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
              {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Correo no válido",
                  },
                })}
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
                className="w-full border-b border-gray-300 py-3 px-1 focus:outline-none focus:border-black transition-colors"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-colors"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-6">
            <button
              type="button"
              className="w-full bg-white text-gray-700 border border-gray-300 font-semibold py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
            >
              <FcGoogle className="h-6 w-6" />
              <span>Registrarse con Google</span>
            </button>
          </div>

          <div className="mt-8 text-center text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/login")} // 👈 Navega al login
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
