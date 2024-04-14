import prismaClient from '../../prisma/prismaclient'

interface HorasTrabalhadasRequest {
    horastrabalhadas: Date,
    horasausentes: number,
    horasextras: number,
}

class PostHorasTrabalhadasService {
    async execute({ horastrabalhadas, horasausentes, horasextras }: HorasTrabalhadasRequest) {

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

class GetHorasService {
    async execute(idhorastrabalhadas: string) {
        const horasTrabalhadas = await prismaClient.horasTrabalhadas.findFirst(
            {
                where: {
                    idhorastrabalhadas: idhorastrabalhadas
                },
                select: {
                    idhorastrabalhadas: true,
                    horastrabalhadas: true,
                    horasausentes: true,
                    horasextras: true,
                    created_at: true,
                }
            });

        if (!horasTrabalhadas)
            throw new Error("Horas Trabalhadas não encontrada.");

        return horasTrabalhadas;
    }
}

export { PostHorasTrabalhadasService, GetHorasService };