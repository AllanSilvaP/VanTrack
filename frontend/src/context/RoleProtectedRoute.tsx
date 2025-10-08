import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

type RoleProtectedRouteProps = {
    allowedRoles: string[];
    children: JSX.Element;
}

export default function RoleProtectedRoute({allowedRoles, children} : RoleProtectedRouteProps) {
    const { user, isAuthenticated } = useAuth();

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if(!allowedRoles.includes(user?.tipo)) {
        return <Navigate to="/" replace />;
    }

    return children
}