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

        return folhapagamento;
    }

    async GetByIDFuncionario(idfuncionario: string) {
        const folhapagamento = await prismaClient.folhaPagamento.findFirst(
            {
                where: {
                    idfuncionario: idfuncionario
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

    async Put({ idfolhapagamento, idadicionais, idbeneficios, iddescontos, idfuncionario, idhorastrabalhadas }: FolhaPagamentoDTO) {

        const folhaPagamento = await prismaClient.folhaPagamento.update({
            data: {
                idadicionais: idadicionais,
                idbeneficios: idbeneficios,
                iddescontos: iddescontos,
                idfuncionario: idfuncionario,
                idhorastrabalhadas: idhorastrabalhadas
            },
            select: {
                idfolhapagamento: true,
                idbeneficios: true,
                iddescontos: true,
                idfuncionario: true,
                idhorastrabalhadas: true
            },
            where: { idfolhapagamento: idfolhapagamento }
        })
        return folhaPagamento;
    }

    async Delete(idFolhaPagamento: string) {
        const folhaPagamento = await prismaClient.folhaPagamento.delete({
            select: {
                idfolhapagamento: true,
                idbeneficios: true,
                iddescontos: true,
                idfuncionario: true,
                idhorastrabalhadas: true
            },
            where: { idfolhapagamento: idFolhaPagamento }
        })
        return folhaPagamento;
    }
}

export { FolhaPagamentoService }