import { BeneficiosDTO } from '../../dtos/BeneficiosDTO';
import prismaClient from '../../prisma/prismaclient'



class PostBeneficiosService {
    async execute({ valetransporte, valealimentacao, salariofamilia, auxiliocreche, diariasparaviagens, descansoremunerado }: BeneficiosDTO) {

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
}

export { PostBeneficiosService };