import { useState } from "react"
import Navbar from "../components/Navbar"
import HubMinhasCriancas from "../components/HubMinhasCriancas";

export default function Responsavel() {
    const [selecao, setSelecao] = useState<string | null>(null);

    const handleBotaoClick = (nome: string) => {
        setSelecao(nome);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onFuncionalidadeClick={handleBotaoClick}/>

            <div className="p-6">
                {selecao === "Minhas Crianças" && <HubMinhasCriancas/>}
                {selecao === "Acompanhar Crianças" && (
                    <div className="text-center text-gray-600"> Acompanhar em tempo real</div>
                )}
                {!selecao && (
                    <div className="text-center text-gray-500">Selecione uma funcionalidade</div>
                )}
            </div>
        </div>
    )
}