
import { GetEmpresaController } from '../../controllers/empresa/GetEmpresaController';
import { UsuarioDTO } from '../../dtos/UsuarioDTO';
import prismaClient from '../../prisma/prismaclient'
import { hash } from 'bcryptjs'
import { GetEmpresaService } from '../empresa/GetEmpresaService';

class PostUsuarioService {
    async execute({ nome, login, email, senha, idempresa}: UsuarioDTO) {

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

export { PostUsuarioService };