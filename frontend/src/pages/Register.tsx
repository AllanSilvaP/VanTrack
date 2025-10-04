import { useState } from "react";
import api from "../api/axios";

export default function Register () {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        tipo: "responsavel",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
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
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Usuário" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Senha" onChange={handleChange} />
        <input name="password2" type="password" placeholder="Confirme a senha" onChange={handleChange} />
        <select name="tipo" onChange={handleChange}>
          <option value="responsavel">Responsável</option>
          <option value="aluno">Aluno</option>
          <option value="motorista">Motorista</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}