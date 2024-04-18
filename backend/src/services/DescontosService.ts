import prismaClient from "../prisma/prismaclient";
import { DescontosDTO } from "../dtos/DescontosDTO";

class DescontosService {
    async Get(iddesconto: string) {
        const descontos = await prismaClient.descontos.findFirst(
            {
                where: {
                    iddesconto: iddesconto
                },
                select: {
                    iddesconto: true,
                    inss: true,
                    fgts: true,
                    irrf: true,
                    valorhorasausentes: true,
                    contribuicaosindical: true,
                    created_at: true,
                }
            });

        return descontos;
    }

    async Post({ inss, fgts, irrf, valorhorasausentes, contribuicaosindical }: DescontosDTO) {

        const descontos = await prismaClient.descontos.create({
            data: {
                inss: inss,
                fgts: fgts,
                irrf: irrf,
                valorhorasausentes: valorhorasausentes,
                contribuicaosindical: contribuicaosindical
            },
            select: {
                iddesconto: true,
                inss: true,
                fgts: true,
                irrf: true,
                valorhorasausentes: true,
                contribuicaosindical: true,
                created_at: true,
            }
        })

        return descontos;
    }

    async Put({ iddesconto, inss, fgts, irrf, valorhorasausentes, contribuicaosindical }: DescontosDTO) {

        const descontos = await prismaClient.descontos.update({
            data: {
                inss: inss,
                fgts: fgts,
                irrf: irrf,
                valorhorasausentes: valorhorasausentes,
                contribuicaosindical: contribuicaosindical
            },
            select: {
                iddesconto: true,
                inss: true,
                fgts: true,
                irrf: true,
                valorhorasausentes: true,
                contribuicaosindical: true
            },
            where: { iddesconto: iddesconto }
        })
        return descontos;
    }

    async Delete(idDesconto: string) {
        const descontos = await prismaClient.descontos.delete({
            select: {
                iddesconto: true,
                inss: true,
                fgts: true,
                irrf: true,
                valorhorasausentes: true,
                contribuicaosindical: true
            },
            where: { iddesconto: idDesconto }
        })
        return descontos;
    }
}

export { DescontosService }