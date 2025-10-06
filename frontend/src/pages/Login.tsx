import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
        } catch (error) {
            alert("Usuário ou senha inválida")
            console.log(error)
        }
    }

    return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8F9FA]">
      <div className="bg-black shadow-2xl rounded-2xl p-8 w-96 border-t-4 border-[#FDC500]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#003049]">TrackVan</h1>
          <p className="text-gray-600 text-sm mt-1">
            Segurança no transporte escolare
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />

          <button
            type="submit"
            className="bg-[#003049] text-white py-3 rounded-lg font-semibold hover:bg-[#00263A] transition duration-200"
          >
            Entrar
          </button>

          <a
            href="#"
            className="text-center text-sm text-[#003049] hover:underline"
          >
            Não tem conta? Cadastre-se
          </a>
        </form>
      </div>
    </div>
  );
}