import prismaClient from '../../prisma/prismaclient'

interface BeneficiosRequest {
    valetransporte: number,
    valealimentacao: number,
    salariofamilia: number,
    auxiliocreche: number
    diariasparaviagens: number,
    descansoremunerado: number
}

class PostBeneficiosService {
    async execute({ valetransporte, valealimentacao, salariofamilia, auxiliocreche, diariasparaviagens, descansoremunerado }: BeneficiosRequest) {

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