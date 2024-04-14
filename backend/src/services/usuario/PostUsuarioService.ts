import prismaClient from '../../prisma/prismaclient'
import { compare, hash } from 'bcryptjs'

interface UsuarioRequest {
    nome: string,
    login: string,
    email: string,
    senha: string
    idempresa: string
}

class PostUsuarioService {
    async execute({ nome, login, email, senha, idempresa }: UsuarioRequest) {

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
                empresa: true
            }
        })

        return usuario;
    }
}

export { PostUsuarioService };