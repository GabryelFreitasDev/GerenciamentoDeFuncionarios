import prismaClient from "../../prisma/prismaclient";

class GetAdicionaisService {
    async execute(idadicional: string) {
        const adicionais = await prismaClient.adicionais.findFirst(
            {
                where: {
                    idadicional: idadicional
                },
                select: {
                    idadicional: true,
                    periculosidade: true,
                    noturno: true,
                    insalubridade: true,
                    tempodeservico: true,
                    valorhorasextras: true,
                    adiantamento: true,
                    percentualcomissao: true,
                    comissao: true,
                    created_at: true,
                }
            });

        if (!adicionais)
            throw new Error("Adicionais não encontrado.");

        return adicionais;
    }
}

export { GetAdicionaisService }