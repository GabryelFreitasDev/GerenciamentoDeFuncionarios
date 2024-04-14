import prismaClient from "../../prisma/prismaclient";

class GetFolhaPagamentoService {
    async execute(idfolhapagamento: string) {
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
}

export { GetFolhaPagamentoService }