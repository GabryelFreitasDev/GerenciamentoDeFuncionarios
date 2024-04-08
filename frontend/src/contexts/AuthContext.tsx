import { createContext, ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { request } from "http";


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
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch (error) {
        console.log("Erro ao deslogar: " + error)
    }
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    useEffect(() => {
        if (user?.id) {
            api.get('/GetUsuario', { params: { idusuario: user?.id }}).then((response) => {
                const { id, nome, email, login } = response.data;

                setUser({ id, nome, email, login });
            }).catch(() => {
                signOut();
            })
        }

    }, [])

    async function signIn({ login, senha }: SignInProps) {
        try {
            const response = await api.post('/AutenticarUsuario', { login: login, senha: senha })

            const { id, nome, email } = response.data;

            setCookie(undefined, '@nextauth.token', id, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })

            setUser({ id, nome, email, login });

            Router.push('/menu');
            toast.success(`Bem vindo, ${nome}!`, { pauseOnHover: false});

        } catch (error) {
            console.log(error);
            toast.error('Usuário ou senha incorretos!');
        }
    }

    async function signUp({ nome, email, login, senha }: SignUpProps) {
        try {
            const response = await api.post('/CadastrarUsuario', {
                nome,
                email,
                login,
                senha
            })

            toast.success('Usuário cadastrado com sucesso!');

            Router.push('/');

        } catch (error) {
            console.log(error);
            toast.error('Erro ao cadastrar usuário!');
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
