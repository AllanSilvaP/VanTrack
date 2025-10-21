/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, type ReactNode} from "react";
import api from "../api/axios"
import { useEffect, useCallback } from "react";

//TEMPO PARA DAR REFRESH (1 HORA)
const REFRESH_INTERVAL = 55 * 60 * 1000;

type AuthContextType = {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode})  => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const refreshAcessToken = useCallback(async () => {
        const refreshToken = localStorage.getItem("refresh");

        if(!refreshToken) {
            console.log("Token de Refresh não encontrado. Fazendo logout.")
            logout();
            return;
        }

        try {
            console.log("Tentanto atualizar o token...")
            const response = await api.post('/usuarios/token/refresh', {
                refresh: refreshToken
            })

            const { access } = response.data;
            localStorage.setItem("access", access)
            console.log("Token atualizado com sucesso.");
        } catch (error) {
            console.error("Erro ao atualizar o token. Necessário novo login.", error);
            alert("Sua sessão expirou. Faça login novamente."); // Alerta que você pediu
            logout();
        }
    }, [])

    const login = async (username: string, password: string) => {
        const response = await api.post('/usuarios/login/', {username, password});
        const {access, refresh, user} = response.data;
        localStorage.setItem("access", access)
        localStorage.setItem("refresh", refresh)
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user);
        setIsAuthenticated(true)

        return user;
    };

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh")
        localStorage.removeItem("user");
        setUser(null)
        setIsAuthenticated(false)
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const access = localStorage.getItem("access")

        if (storedUser && access) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true)
        }
    }, [])

    useEffect(() => {
        let interval: number | null = null;

        if(isAuthenticated) {
            interval = setInterval(refreshAcessToken, REFRESH_INTERVAL);
        } else if (interval) {
            clearInterval(interval)
        }

        return () => {
            if(interval) {
                clearInterval(interval)
            }
        }
    }, [isAuthenticated, refreshAcessToken])

    return (
        <AuthContext.Provider value = {{user, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvider");
    return context
};