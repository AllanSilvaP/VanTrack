/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, type ReactNode} from "react";
import api from "../api/axios"
import { useEffect } from "react";

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