import prismaClient from "../../prisma/prismaclient";

export class GetFuncionarioService {
    async Get(idfuncionario: string) {
        const funcionario = await prismaClient.funcionario.findFirst(
            {
                where: {
                    idfuncionario: idfuncionario
                },
                select: {
                    idfuncionario: true,
                    //codigo: true,
                    nome: true,
                    //iddepartamento: true,
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

    async GetAll() {
        const funcionario = await prismaClient.funcionario.findMany(
            {
                select: {
                    idfuncionario: true,
                    //codigo: true,
                    nome: true,
                    //iddepartamento: true,
                    idcargo: true,
                    categoria: true,
                    dataadmissao: true,
                    idusuariocadastro: true
                }
            });

        if (!funcionario)
            throw new Error("Funcionarios não encontrados.");

        return funcionario;
    }
}