import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    tipo: "responsavel",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post("/usuarios/registrar/", form)
    } catch (error) {
      alert("Erro no cadastro")
      console.log(error)
      console.log(form)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F8F9FA]">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-96 border-t-4 border-[#FDC500]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#003049]">TrackVan</h1>
          <p className="text-gray-600 text-sm mt-1">
            Segurança no transporte escolar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
          name="username" 
          placeholder="Usuário" 
          onChange={handleChange} 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />
          <input 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />
          <input 
          name="password" 
          type="password" 
          placeholder="Senha" 
          onChange={handleChange} 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />
          <input 
          name="password2" 
          type="password" 
          placeholder="Confirme a senha" 
          onChange={handleChange} 
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />
          <select 
          name="tipo" 
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="responsavel">Responsável</option>
            <option value="aluno">Aluno</option>
            <option value="motorista">Motorista</option>
          </select>
          <button 
          type="submit"
          className="bg-[#003049] text-white py-3 rounded-lg font-semibold hover:bg-[#00263A] transition duration-200"
          >Cadastrar</button>

          <a
            href="#"
            className="text-center text-sm text-[#003049] hover:underline"
          >
            Já tem conta? Faça Login
          </a>
        </form>
      </div>
    </div>
  );
}