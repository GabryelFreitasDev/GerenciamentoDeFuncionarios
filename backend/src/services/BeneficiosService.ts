import { BeneficiosDTO } from "../dtos/BeneficiosDTO";
import prismaClient from "../prisma/prismaclient";

class BeneficiosService {
    async Get(idbeneficios: string) {
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

        return beneficios;
    }

    async Post({ valetransporte, valealimentacao, salariofamilia, auxiliocreche, diariasparaviagens, descansoremunerado }: BeneficiosDTO) {

        const beneficios = await prismaClient.beneficios.create({
            data: {
                valetransporte: valetransporte,
                valealimentacao: valealimentacao,
                salariofamilia: salariofamilia,
                auxiliocreche: auxiliocreche,
                diariasparaviagens: diariasparaviagens,
                descansoremunerado: descansoremunerado
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
        })

        return beneficios;
    }

    async Put({ idbeneficio, auxiliocreche, descansoremunerado, diariasparaviagens, salariofamilia, valealimentacao, valetransporte }: BeneficiosDTO) {

        const beneficios = await prismaClient.beneficios.update({
            data: {
                auxiliocreche: auxiliocreche,
                descansoremunerado: descansoremunerado,
                diariasparaviagens: diariasparaviagens,
                salariofamilia: salariofamilia,
                valealimentacao: valealimentacao,
                valetransporte: valetransporte
            },
            select: {
                idbeneficio: true,
                auxiliocreche: true,
                descansoremunerado: true,
                diariasparaviagens: true,
                salariofamilia: true,
                valealimentacao: true,
                valetransporte: true
            },
            where: { idbeneficio: idbeneficio }
        })
        return beneficios;
    }

    async Delete(idBeneficio: string) {
        const beneficios = await prismaClient.beneficios.delete({
            select: {
                idbeneficio: true,
                auxiliocreche: true,
                descansoremunerado: true,
                diariasparaviagens: true,
                folhapagamento: true,
                salariofamilia: true,
                valealimentacao: true,
                valetransporte: true  
            },
            where: { idbeneficio: idBeneficio }
        })
        return beneficios;
    }
    
}

export { BeneficiosService }