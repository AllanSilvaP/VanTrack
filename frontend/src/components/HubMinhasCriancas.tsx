import api from "../api/axios"
import { useEffect, useState } from "react"
import { Plus, X } from "lucide-react"

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
    const [showModal, setShowModal] = useState(false);
    const [novoFilho, setNovoFilho] = useState({ nome: "", data_nascimento: "", escola: "", })

    const fetchFilhos = async () => {
        try {
            const token = localStorage.getItem("access")
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
        setShowModal(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("access")
            await api.post(
                "/filhos/", {
                nome: novoFilho.nome,
                data_nascimento: novoFilho.data_nascimento,
                escola: novoFilho.escola ?Number(novoFilho.escola) : null
            },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }

            )
            setShowModal(false)
            setNovoFilho({ nome: "", data_nascimento: "", escola: "", })
            fetchFilhos();
        } catch (error) {
            alert("Erro ao cadastrar filho" + error)
            console.log({
                novoFilho
            })
        }
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-content items-center z-50">
                    <div className="bg-white rounded-2xç shadow-xl p-6 w-[400px] relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X size={22} />
                        </button>

                        <h2 className="text-xl font-bold text-[#003049] mb-4">Adicionar Filho</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Nome"
                                value={novoFilho.nome}
                                onChange={(e) => setNovoFilho({ ...novoFilho, nome: e.target.value })}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Data de Nascimento"
                                value={novoFilho.data_nascimento}
                                onChange={(e) =>
                                    setNovoFilho({ ...novoFilho, data_nascimento: e.target.value })
                                }
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Escola (opcional)"
                                value={novoFilho.escola}
                                onChange={(e) => setNovoFilho({ ...novoFilho, escola: e.target.value })}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FDC500]"
                            />

                            <button
                                type="submit"
                                className="bg-[#FDC500] hover:bg-[#e4b700] text-[#003049] font-semibold py-2 rounded-lg transition"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}