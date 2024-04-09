import prismaClient from "../../prisma/prismaclient";

class GetUsuarioService {
    async execute(idusuario: string) {
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
}

export { GetUsuarioService }