import prismaClient from '../../prisma/prismaclient'

class PostHorasTrabalhadasService {
    async execute({ horastrabalhadas, horasausentes, horasextras }: HorasTrabalhadasDTO) {

        const horasTrabalhadas = await prismaClient.horasTrabalhadas.create({
            data: {
                horastrabalhadas: horastrabalhadas,
                horasausentes: horasausentes,
                horasextras: horasextras,
            },
            select: {
                idhorastrabalhadas: true,
                horastrabalhadas: true,
                horasausentes: true,
                horasextras: true,
                created_at: true,
            }
        })

        return horasTrabalhadas;
    }
}

export { PostHorasTrabalhadasService };