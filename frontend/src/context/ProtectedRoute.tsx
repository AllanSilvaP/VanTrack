import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

type ProtectedRouteProps = {
    children: JSX.Element;
};

export default function ProtectedRoute({children} : ProtectedRouteProps) {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }
    return children
}