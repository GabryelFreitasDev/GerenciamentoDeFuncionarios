import prismaClient from '../../prisma/prismaclient'

interface FuncionarioRequest {
    codigo: number,
    nome: string,
    iddepartamento: string
    idcargo: string,
    categoria: number,
    dataadmissao: Date,
    idusuariocadastro: string,
}

class PostFuncionarioService {
    async execute({ codigo, nome, iddepartamento, idcargo, categoria, dataadmissao, idusuariocadastro }: FuncionarioRequest) {

        const funcionarioJaExite = await prismaClient.funcionario.findFirst({ where: { nome: nome } })
        if (funcionarioJaExite)
            throw new Error("Já existe um funcionario com esse nome!");

        const funcionario = await prismaClient.funcionario.create({
            data: {
                codigo: codigo,
                nome: nome,
                iddepartamento: iddepartamento,
                idcargo: idcargo,
                categoria: categoria,
                dataadmissao: dataadmissao,
                idusuariocadastro: idusuariocadastro
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
        })

        return funcionario;
    }
}

export { PostFuncionarioService };