import prismaClient from '../../prisma/prismaclient'

class PostAdicionaisService {
    async execute({ periculosidade, noturno, insalubridade, valorhorasextras, adiantamento, percentualcomissao, comissao }: AdicionaisDTO) {

        const adicionais = await prismaClient.adicionais.create({
            data: {
                periculosidade: periculosidade,
                noturno: noturno,
                insalubridade: insalubridade,
                valorhorasextras: valorhorasextras,
                adiantamento: adiantamento,
                percentualcomissao: percentualcomissao,
                comissao
            },
            select: {
                idadicional: true,
                periculosidade: true,
                noturno: true,
                insalubridade: true,
                tempodeservico: true,
                valorhorasextras: true,
                adiantamento: true,
                percentualcomissao: true,
                comissao: true,
                created_at: true,
            }
        })

        return adicionais;
    }
}



export { PostAdicionaisService };