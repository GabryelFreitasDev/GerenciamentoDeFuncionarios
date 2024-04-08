import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    login: (creditials: LoginProps) => Promise<void>
}

type UserProps = {
    id: string;
    nome: string;
    email: string;
    login: string;
}

type LoginProps = {
    login: string;
    senha: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function login(){
        alert('Login');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    )
}
