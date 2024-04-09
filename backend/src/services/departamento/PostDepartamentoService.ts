import prismaClient from '../../prisma/prismaclient'

interface DepartamentoRequest {
    descricao: string
}

class PostDepartamentoService {
    async execute({ descricao  }: DepartamentoRequest) {

        const departamentoJaExite = await prismaClient.departamento.findFirst({ where: { descricao: descricao } })
        if (departamentoJaExite)
            throw new Error("Já existe um departamento com esse nome!");

        const departamento = await prismaClient.departamento.create({
            data: {
                descricao: descricao
            },
            select: {
                iddepartamento: true,
                descricao: true
            }
        })

        return departamento;
    }
}

export { PostDepartamentoService };