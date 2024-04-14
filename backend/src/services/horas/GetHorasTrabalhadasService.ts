import prismaClient from "../../prisma/prismaclient";

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
            throw new Error("Horas Trabalhadas não encontrad.");

        return horasTrabalhadas;
    }
}

export { GetHorasService }