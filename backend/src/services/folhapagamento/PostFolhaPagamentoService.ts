import { FolhaPagamentoDTO } from '../../dtos/FolhaPagamentoDTO';
import prismaClient from '../../prisma/prismaclient'

class PostFolhaPagamentoService {
    async execute({ idfuncionario, idbeneficios, idadicionais, iddescontos, idhorastrabalhadas }: FolhaPagamentoDTO) {

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

export { PostFolhaPagamentoService };