import prismaClient from "../prisma/prismaclient";
import { compare, hash } from "bcryptjs";
import { UsuarioDTO } from "../dtos/UsuarioDTO";

interface AutenticarRequest {
    login: string;
    senha: string;
}

class UsuarioService {
    async AutenticarUsuario({ login, senha }: AutenticarRequest) {
        if (!login)
            throw new Error("Preencha o login!");
        if (!senha)
            throw new Error("Preencha a senha!");

        const usuario = await prismaClient.usuario.findFirst({ where: { login: login } });

        if (!usuario)
            throw new Error("Usuário ou Senha incorreta!");

        const senhaValida = await compare(senha, usuario.senha);
        if (!senhaValida)
            throw new Error("Usuário ou Senha incorreta!");

        return usuario;
    }

    async Get(idusuario: string) {
        const usuario = await prismaClient.usuario.findFirst(
            {
                where: {
                    idusuario: idusuario
                },
                select: {
                    idusuario: true,
                    nome: true,
                    login: true,
                    email: true,
                    idempresa: true
                }
            });

        if (!usuario)
            throw new Error("Usuário não encontrado.");

        return usuario;
    }

    async Post({ nome, login, email, senha, idempresa}: UsuarioDTO) {

        const usuarioJaExite = await prismaClient.usuario.findFirst({ where: { login: login } })
        if (usuarioJaExite)
            throw new Error("Usuario já existe!");

        const senhaCriptografada = await hash(senha, 8);

        const usuario = await prismaClient.usuario.create({
            data: {
                nome: nome,
                login: login,
                email: email,
                senha: senhaCriptografada,
                idempresa: idempresa
            },
            select: {
                idusuario: true,
                nome: true,
                login: true,
                email: true,
                senha: true,
                idempresa: true
            }
        })

        return usuario;
    }
}

export { UsuarioService }