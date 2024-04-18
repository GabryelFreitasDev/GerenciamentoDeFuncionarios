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

    async Put({ idusuario, nome, login, senha, email, idempresa }: UsuarioDTO) {

        const usuario = await prismaClient.usuario.update({
            data: {
                nome: nome,
                login: login,
                senha: senha,
                email: email,
                idempresa: idempresa
            },
            select: {
                idusuario: true,
                nome: true,
                login: true,
                senha: true,
                email: true,
                idempresa: true
            },
            where: { idusuario: idusuario }
        })
        return usuario;
    }

    async Delete(idUsuario: string) {
        const usuario = await prismaClient.usuario.delete({
            select: {
                idusuario: true,
                nome: true,
                login: true,
                senha: true,
                email: true,
                idempresa: true
            },
            where: { idusuario: idUsuario }
        })
        return usuario;
    }
}

export { UsuarioService }