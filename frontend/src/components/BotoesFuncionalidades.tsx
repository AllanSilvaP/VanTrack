type BotoesFuncionalidadesProps = {
    opcoes: string[];
    onClick?: (nome: string) => void;
}

export default function BotoesFuncionalidades ({opcoes,onClick,} : BotoesFuncionalidadesProps)  {
    return (
        <div className="flex justify-center  gap-4 bg-[#F8F9FA] py-4 shadow-sm">
            {opcoes.map((opcao, index) => (
                <button
                    key={index}
                    onClick={() => onClick?.(opcao)}
                    className="px-6 py-2 bg-[#003049] text-white font-medium rounded-lg hover:bg-[#00263A] transition duration-200 shadow-md"
                >
                    {opcao}
                </button>
            ))}
        </div>
    )
}