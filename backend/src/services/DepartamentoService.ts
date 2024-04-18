import prismaClient from "../prisma/prismaclient";
import { DepartamentoDTO } from "../dtos/DepartamentoDTO";

class DepartamentoService {
    async Get(iddepartamento: string) {
        const departamento = await prismaClient.departamento.findFirst(
            {
                where: {
                    iddepartamento: iddepartamento
                },
                select: {
                    iddepartamento: true,
                    descricao: true
                }
            });

        return departamento;
    }

    async Post({ descricao }: DepartamentoDTO) {

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

    async Put({ iddepartamento, descricao }: DepartamentoDTO) {

        const departamento = await prismaClient.departamento.update({
            data: {
                descricao: descricao
            },
            select: {
                iddepartamento: true,
                descricao: true
            },
            where: { iddepartamento: iddepartamento }
        })
        return departamento;
    }

    async Delete(idDepartamento: string) {
        const departamento = await prismaClient.departamento.delete({
            select: {
                iddepartamento: true,
                descricao: true
            },
            where: { iddepartamento: idDepartamento }
        })
        return departamento;
    }
}

export { DepartamentoService }