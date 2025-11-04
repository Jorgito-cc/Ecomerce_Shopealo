import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { http } from "../../../api/http";
import { FaMicrophone, FaMicrophoneSlash, FaPaperPlane } from "react-icons/fa";

export const ReportesIA: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // 🔄 Actualiza el input automáticamente cuando se detecta voz
  useEffect(() => {
    if (transcript) {
      setPrompt(transcript);
    }
  }, [transcript]);

  // 🎙️ Iniciar/detener voz
  const handleMicToggle = async () => {
    if (listening) {
      SpeechRecognition.stopListening();
      console.log("🎤 Micrófono detenido");
    } else {
      resetTranscript();
      console.log("🎙️ Micrófono iniciado...");
      await SpeechRecognition.startListening({
        language: "es-ES",
        continuous: true,
      });
    }
  };

  // 📡 Enviar prompt al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      const { data } = await http.post("/api/v1/reportes/sql", { prompt });
      setResultados(data.resultados);
      setQuery(data.query);
    } catch (error: any) {
      console.error(error);
      alert("Error generando el reporte. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        📊 Reportes Inteligentes con IA
      </h1>

      {!browserSupportsSpeechRecognition && (
        <p className="text-red-500 mb-4">
          ⚠️ Tu navegador no soporta reconocimiento de voz.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border rounded-md p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Ejemplo: quiero los productos con stock mayor a 30"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="button"
            onClick={handleMicToggle}
            className={`p-3 rounded-md ${
              listening ? "bg-red-500" : "bg-indigo-600"
            } text-white hover:opacity-90 transition`}
            title={listening ? "Detener micrófono" : "Hablar"}
          >
            {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>

      {query && (
        <div className="mb-6 bg-gray-100 p-4 rounded-md">
          <p className="text-sm font-mono text-gray-700">
            <strong>🧩 Consulta generada:</strong> {query}
          </p>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 animate-pulse">Generando reporte...</p>
      ) : resultados.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                {Object.keys(resultados[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {resultados.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(row).map((value, j) => (
                    <td key={j} className="px-4 py-2">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No hay resultados aún.</p>
      )}
    </section>
  );
};
