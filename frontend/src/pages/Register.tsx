import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    tipo: "responsavel",
  })

  const [sucess, setSucess] = useState<boolean | null>(null);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    password2: "",
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validar Erros
  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newErros: any = {};

    const usernameRegex = /^[\w.@+-]+$/;
    if (!usernameRegex.test(form.username)) {
      newErros.username = "O nome de usuário só pode conter letras, números e os caracteres @ . + - _";
    }

    if (form.password.length < 8) {
      newErros.password = "A senha deve ter pelo menos 8 caracteres";
    }

    if (!/[A-Z]/.test(form.password)) {
      newErros.password = "A senha deve conter pelo menos uma letra maiúscula";
    }

    if (!/\d/.test(form.password)) {
      newErros.password = "A senha deve conter pelo menos um número";
    }

    if (form.password != form.password2) {
      newErros.password2 = "As senhas não conferem"
    }

    setErrors(newErros)
    return Object.keys(newErros).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post("/usuarios/registrar/", form)

      if (response.status === 201 || response.status === 200) {
        setSucess(true);
      }

      return response
    } catch (error) {
      alert("Erro no cadastro")
      console.log(error)
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
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <input
            name="password2"
            type="password"
            placeholder="Confirme a senha"
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
          />
          {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
          <select
            name="tipo"
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="responsavel">Sou responsável</option>
            <option value="motorista">Sou motorista</option>
          </select>
          <button
            type="submit"
            className="bg-[#003049] text-white py-3 rounded-lg font-semibold hover:bg-[#00263A] transition duration-200"
          >Cadastrar</button>

          {sucess === true && (
            <p className="flex items-center justify-center text-green-600 font-medium mt-2">
              ✅ Conta criada com sucesso!
            </p>
          )}

          <Link
            to="/login"
            className="text-center text-sm text-[#003049] hover:underline"
          >Já tem conta? Faça Login</Link>
        </form>
      </div>
    </div>
  );
}