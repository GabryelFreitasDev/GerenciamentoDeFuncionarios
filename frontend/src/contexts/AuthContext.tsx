import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (creditials: SignInProps) => Promise<void>; //Login
    signOut: () => void; // LogOut
    signUp: (creditials: SignUpProps) => Promise<void>; //Cadastro
}

type UserProps = {
    id: string;
    nome: string;
    email: string;
    login: string;
}

type SignInProps = {
    login: string;
    senha: string;
}

type SignUpProps = {
    nome: string;
    email: string;
    login: string;
    senha: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export function signOut() {
    try {
        Router.push('/')
    } catch (error) {
        console.log("Erro ao deslogar: " + error)
    }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ login, senha }: SignInProps) {
        try {
            const response = await api.post('/AutenticarUsuario', { login: login, senha: senha })

            const {id, nome, email} = response.data;

            setUser({ id, nome, email, login });

            Router.push('/menu');

        } catch (error) {
            console.log(error);
            alert('Usuario ou senha incorretos!');
        }
    }

    async function signUp({ nome, email, login, senha}: SignUpProps){
        try {
            const response = await api.post('/CadastrarUsuario', { 
                nome,
                email,
                login,
                senha })

            alert("Usuário cadastrado com sucesso!");

            Router.push('/');

        } catch (error) {
            console.log(error);
            alert('Usuario ou senha incorretos!');
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
