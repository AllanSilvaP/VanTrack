import api from "../api/axios"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

type Filho = {
    id: number;
    nome: string;
    data_nascimento: string;
    idade: number;
    escola_nome: string;
    responsavel_nome: string;
}

export default function HubMinhasCriancas() {
    const [filhos, setFilhos] = useState<Filho[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFilhos = async () => {
        try {
            const token = localStorage.getItem("acess")
            const response = await api.get("/filhos/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFilhos(response.data)
        } catch (error) {
            console.error("Erro ao buscar filhos", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFilhos();
    }, []);

    const handleAddFilho = () => {
        alert("ACHOU QUE IA FUNCIONAR KKKKK")
    }

    return (
        <div className="p-6 bg-[#F8F9FA] min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#003049]">Filhos Cadastrados</h1>

                <button
                    onClick={handleAddFilho}
                    className="flex items-center gap-2 bg-[#FDC500] hover:bg-[#e4b700] text-[#003049] px-4 py-2 rounded-lg font-semibold transition">
                    <Plus size={20} />
                    Adicionar
                </button>
            </div>

            {loading ? (
                <p className="text-gray-600">Carregando...</p>
            ) : filhos.length === 0 ? (
                <p >Nenhum filho cadastrado ainda.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
                        <thead className="bg-[#003049] text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Nome</th>
                                <th className="py-3 px-4 text-left">Idade</th>
                                <th className="py-3 px-4 text-left">Data de Nascimento</th>
                                <th className="py-3 px-4 text-left">Escola</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filhos.map((filho) => (
                                <tr key={filho.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">{filho.nome}</td>
                                    <td className="py-3 px-4">{filho.idade} anos</td>
                                    <td className="py-3 px-4">
                                        {new Date(filho.data_nascimento).toLocaleDateString("pt-BR")}
                                    </td>
                                    <td className="py-3 px-4">{filho.escola_nome || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}