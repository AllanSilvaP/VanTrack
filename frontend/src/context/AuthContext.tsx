/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext, type ReactNode} from "react";
import api from "../api/axios"

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
        const {access, refresh} = response.data;

        localStorage.setItem("acess", access)
        localStorage.setItem("refresh", refresh)

        setUser({ username});
        setIsAuthenticated(true)
    };

    const logout = () => {
        localStorage.removeItem("acess");
        localStorage.removeItem("refresh")
        setUser(null)
        setIsAuthenticated(false)
    };

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