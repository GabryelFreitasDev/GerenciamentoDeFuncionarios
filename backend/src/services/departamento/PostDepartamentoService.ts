import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';
import prismaClient from '../../prisma/prismaclient'

class PostDepartamentoService {
    async execute({ descricao }: DepartamentoDTO) {

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