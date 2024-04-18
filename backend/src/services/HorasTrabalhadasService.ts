import { HorasTrabalhadasDTO } from "../dtos/HorasTrabalhadasDTO";
import prismaClient from "../prisma/prismaclient";

class HorasTrabalhadasService {
    async Get(idhorastrabalhadas: string) {
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

        return horasTrabalhadas;
    }

    async Post({ horastrabalhadas, horasausentes, horasextras }: HorasTrabalhadasDTO) {

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

export { HorasTrabalhadasService }