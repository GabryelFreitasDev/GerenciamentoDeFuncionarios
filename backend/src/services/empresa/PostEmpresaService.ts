import prismaClient from '../../prisma/prismaclient'

class PostEmpresaService {
    async execute({ nome, cnpj, endereco }: EmpresaDTO) {

        const empresaJaExite = await prismaClient.empresa.findFirst({ where: { nome: nome } })
        if (empresaJaExite)
            throw new Error("Já existe uma empresa com esse nome!");

        const empresa = await prismaClient.empresa.create({
            data: {
                nome: nome,
                cnpj: cnpj,
                endereco: endereco
            },
            select: {
                idempresa: true,
                nome: true,
                cnpj: true,
                endereco: true
            }
        })

        return empresa;
    }
}

export { PostEmpresaService };