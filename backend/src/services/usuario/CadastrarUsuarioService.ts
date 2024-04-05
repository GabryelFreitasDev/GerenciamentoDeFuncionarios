import prismaClient from '../../prisma/prismaclient'
import { hash } from 'bcryptjs'

interface UsuarioRequest{
    nome: string,
    login: string,
    email: string,
    senha: string
}

class CadastrarUsuarioService{
    async execute({nome, login, email, senha}: UsuarioRequest){

        if(!nome)
            throw new Error("Nome não inserido!")

        const usuarioJaExite = await prismaClient.usuario.findFirst({ where: { login: login } })
        if(usuarioJaExite)
            throw new Error("Usuario já existe!");

        const senhaCriptografada = await hash(senha, 8);

        const usuario = await prismaClient.usuario.create({
            data: {
                nome: nome,
                login: login,
                email: email,
                senha: senhaCriptografada
            },
            select: {
                idusuario: true,
                nome: true,
                login: true,
                email: true,
            }
        })

        return usuario;
    }
}

//function validaUsuario(usuarioRequest: UsuarioRequest){}

export { CadastrarUsuarioService };