import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import apiClient, { setAccessToken } from "../api/client";
import AuthContext from "./AuthContext";
import type { User } from "./types";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (email: string, password: string): Promise<User> => {
        const response = await apiClient.post("/auth/login", { email, password });
        const { accessToken, user } = response.data as { accessToken: string; user: User };

        setAccessToken(accessToken);
        setUser(user);
        return user;
    };

    const logout = async () => {
        try {
            await apiClient.post("/auth/logout");
        } catch { }
        setAccessToken(null);
        setUser(null);
    };

    const initAuth = async () => {
        try {
            const response = await apiClient.post("/auth/refresh");
            const { accessToken, user } = response.data as {
                accessToken: string;
                user: User;
            };

            setAccessToken(accessToken);
            setUser(user);
        } catch {
            setAccessToken(null);
            setUser(null);
        } finally {
            setLoading(false); // 🔥 THIS MUST ALWAYS RUN
        }
    };


    useEffect(() => {
        initAuth();
    }, []);



    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
