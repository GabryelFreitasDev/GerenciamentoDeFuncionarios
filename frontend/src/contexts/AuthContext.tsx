import { createContext, ReactNode, useState, useEffect } from "react";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast } from "react-toastify";
import { destroyCookie, setCookie } from "nookies";

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (creditials: SignInProps) => Promise<void>; //Login
    signOut: () => void; // LogOut
    signUp: (creditials: SignUpProps) => Promise<void>; //Cadastro
}

type UserProps = {
    idusuario: string;
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
    idempresa: string;
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
        if (user?.idusuario) {
            api.get('/Usuario', { params: { idusuario: user?.idusuario } }).then((response) => {
                const { idusuario, nome, email, login } = response.data;

                setUser({ idusuario, nome, email, login });
            }).catch(() => {
                signOut();
            })
        }

    }, [])

    async function signIn({ login, senha }: SignInProps) {
        try {
            const response = await api.post('/Usuario/AutenticarUsuario', { login: login, senha: senha })

            const { idusuario, nome, email } = response.data;

            setCookie(undefined, '@nextauth.token', idusuario, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })

            setUser({ idusuario, nome, email, login });

            Router.push('/menu');
            toast.success(`Bem vindo ${nome}, como posso te ajudar hoje?`, { pauseOnHover: false });

        } catch (error) {
            console.log(error);
            toast.error('Usuário ou senha incorretos!');
        }
    }

    async function signUp({ nome, email, login, senha, idempresa }: SignUpProps) {
        try {
            const response = await api.post('/Usuario', {
                nome,
                email,
                login,
                senha,
                idempresa: 'id_da_empresa'
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
