import prismaClient from "../../prisma/prismaclient";

class GetBeneficiosService {
    async execute(idbeneficios: string) {
        const beneficios = await prismaClient.beneficios.findFirst(
            {
                where: {
                    idbeneficio: idbeneficios
                },
                select: {
                    idbeneficio: true,
                    valetransporte: true,
                    valealimentacao: true,
                    salariofamilia: true,
                    auxiliocreche: true,
                    diariasparaviagens: true,
                    descansoremunerado: true,
                    created_at: true,
                }
            });

        if (!beneficios)
            throw new Error("Beneficios não encontrado.");

        return beneficios;
    }
}

export { GetBeneficiosService }