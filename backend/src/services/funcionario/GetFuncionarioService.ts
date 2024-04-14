import prismaClient from "../../prisma/prismaclient";

class GetFuncionarioService {
    async execute(idfuncionario: string) {
        const funcionario = await prismaClient.funcionario.findFirst(
            {
                where: {
                    idfuncionario: idfuncionario
                },
                select: {
                    idfuncionario: true,
                    codigo: true,
                    nome: true,
                    iddepartamento: true,
                    idcargo: true,
                    categoria: true,
                    dataadmissao: true,
                    idusuariocadastro: true
                }
            });

        if (!funcionario)
            throw new Error("Funcionario não encontrado.");

        return funcionario;
    }
}

export { GetFuncionarioService }