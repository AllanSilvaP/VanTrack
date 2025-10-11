import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu } from "lucide-react";
import BotoesFuncionalidades from "./BotoesFuncionalidades";

type NavbarProps = {
  onFuncionalidadeClick?: (nome: string) => void;
}

export default function NavbarComBotoes({onFuncionalidadeClick} : NavbarProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const opcoes = ["Acompanhar Crianças", "Minhas Crianças"];

  return (
    <div className="flex flex-col">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between bg-[#003049] p-4 shadow-md relative">
        <div className="w-10" />

        <div className="flex justify-center flex-1">
          <img
            src="/VanTrack.jpeg"
            alt="VanTrack Logo"
            className="h-10 object-contain"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-white hover:text-[#FDC500] transition"
          >
            <Menu size={28} />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-32 border border-gray-200 z-50 transform origin-top transition-all duration-300 ease-out scale-y-100 opacity-100">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* BOTÕES FUNCIONALIDADES */}
      <BotoesFuncionalidades 
      opcoes={opcoes} 
      onClick={onFuncionalidadeClick} />
    </div>
  );
}
