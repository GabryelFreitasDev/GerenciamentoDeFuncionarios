import prismaClient from "../../prisma/prismaclient";
import { compare } from "bcryptjs";

interface AutenticarRequest {
    login: string;
    senha: string;
}

class AutenticarUsuarioService {
    async execute({ login, senha }: AutenticarRequest) {
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
}

export { AutenticarUsuarioService }