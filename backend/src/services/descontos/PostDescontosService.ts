import prismaClient from '../../prisma/prismaclient'

class PostDescontosService {
    async execute({ inss, fgts, irrf, valorhorasausentes, contribuicaosindical }: DescontosDTO) {

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
}

export { PostDescontosService };