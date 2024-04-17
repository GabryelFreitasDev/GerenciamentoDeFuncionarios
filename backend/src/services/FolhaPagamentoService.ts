import { FolhaPagamentoDTO } from "../dtos/FolhaPagamentoDTO";
import prismaClient from "../prisma/prismaclient";

class FolhaPagamentoService {
    async Get(idfolhapagamento: string) {
        const folhapagamento = await prismaClient.folhaPagamento.findFirst(
            {
                where: {
                    idfolhapagamento: idfolhapagamento
                },
                select: {
                    idfolhapagamento: true,
                    idfuncionario: true,
                    idbeneficios: true,
                    idadicionais: true,
                    iddescontos: true,
                    idhorastrabalhadas: true
                }
            });

        if (!folhapagamento)
            throw new Error("FolhaPagamento não encontrado.");

        return folhapagamento;
    }

    async Post({ idfuncionario, idbeneficios, idadicionais, iddescontos, idhorastrabalhadas }: FolhaPagamentoDTO) {

        const folhapagamento = await prismaClient.folhaPagamento.create({
            data: {
                idfuncionario: idfuncionario,
                idbeneficios: idbeneficios,
                idadicionais: idadicionais,
                iddescontos: iddescontos,
                idhorastrabalhadas: idhorastrabalhadas
            },
            select: {
                idfolhapagamento: true,
                idfuncionario: true,
                idbeneficios: true,
                idadicionais: true,
                iddescontos: true,
                idhorastrabalhadas: true
            }
        })

        return folhapagamento;
    }
}

export { FolhaPagamentoService }