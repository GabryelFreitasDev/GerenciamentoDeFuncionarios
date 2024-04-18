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

    async Put({ idadicional, adiantamento, comissao, insalubridade, noturno, percentualcomissao, periculosidade, valorhorasextras }: AdicionaisDTO) {

        const adicionais = await prismaClient.adicionais.update({
            data: {
                adiantamento: adiantamento,
                comissao: comissao,
                insalubridade: insalubridade,
                noturno: noturno,
                percentualcomissao: percentualcomissao,
                periculosidade: periculosidade,
                valorhorasextras: valorhorasextras
            },
            select: {
                idadicional: true,
                adiantamento: true,
                comissao: true,
                insalubridade: true,
                noturno: true,
                percentualcomissao: true,
                periculosidade: true,
                valorhorasextras: true
            },
            where: { idadicional: idadicional }
        })
        return adicionais;
    }

    async Delete(idAdicional: string) {
        const adicionais = await prismaClient.adicionais.delete({
            select: {
                idadicional: true,
                adiantamento: true,
                comissao: true,
                folhapagamento: true,
                insalubridade: true,
                noturno: true,
                percentualcomissao: true,
                periculosidade: true,
                tempodeservico: true,
                valorhorasextras: true
            },
            where: { idadicional: idAdicional }
        })
        return adicionais;
    }
}

export { AdicionaisService }