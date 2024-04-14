import prismaClient from '../../prisma/prismaclient'

interface FolhaPagamentoRequest {
    idfuncionario: string,
    idbeneficios: string,
    idadicionais: string,
    iddescontos: string
    idhorastrabalhadas: string
}

class PostFolhaPagamentoService {
    async execute({ idfuncionario, idbeneficios, idadicionais, iddescontos, idhorastrabalhadas }: FolhaPagamentoRequest) {

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