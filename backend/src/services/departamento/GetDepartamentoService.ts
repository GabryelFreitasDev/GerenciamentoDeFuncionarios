import prismaClient from "../../prisma/prismaclient";

class GetDepartamentoService {
    async execute(iddepartamento: string) {
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

        if (!departamento)
            throw new Error("Departamento não encontrado.");

        return departamento;
    }
}

export { GetDepartamentoService }