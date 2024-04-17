import { AdicionaisDTO } from "../dtos/AdicionaisDTO";
import prismaClient from "../prisma/prismaclient";

class AdicionaisService {
    async Get(idadicional: string) {
        const adicionais = await prismaClient.adicionais.findFirst(
            {
                where: {
                    idadicional: idadicional
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
            });

        if (!adicionais)
            throw new Error("Adicionais não encontrado.");

        return adicionais;
    }

    async Post({ periculosidade, noturno, insalubridade, valorhorasextras, adiantamento, percentualcomissao, comissao }: AdicionaisDTO) {

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

export { AdicionaisService }