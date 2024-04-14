import prismaClient from "../../prisma/prismaclient";

class GetDescontosService {
    async execute(iddesconto: string) {
        const descontos = await prismaClient.descontos.findFirst(
            {
                where: {
                    iddesconto: iddesconto
                },
                select: {
                    iddesconto: true,
                    inss: true,
                    fgts: true,
                    irrf: true,
                    valorhorasausentes: true,
                    contribuicaosindical: true,
                    created_at: true,
                }
            });

        if (!descontos)
            throw new Error("Descontos não encontrado.");

        return descontos;
    }
}

export { GetDescontosService }