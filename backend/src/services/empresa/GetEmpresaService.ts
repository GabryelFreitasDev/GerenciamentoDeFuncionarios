import prismaClient from "../../prisma/prismaclient";

class GetEmpresaService {
    async execute(idempresa: string) {
        const empresa = await prismaClient.empresa.findFirst(
            {
                where: {
                    idempresa: idempresa
                },
                select: {
                    idempresa: true,
                    nome: true,
                    cnpj: true,
                    endereco: true
                }
            });

        if (!empresa)
            throw new Error("Empresa não encontrada.");

        return empresa;
    }
}

export { GetEmpresaService }