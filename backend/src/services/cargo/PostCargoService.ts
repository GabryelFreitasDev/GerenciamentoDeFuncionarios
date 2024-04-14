import prismaClient from '../../prisma/prismaclient'

class PostCargoService {
    async execute({ nome, salariobase, iddepartamento }: CargoDTO) {

        const cargoJaExite = await prismaClient.cargo.findFirst({ where: { nome: nome } })
        if (cargoJaExite)
            throw new Error("Já existe um cargo com esse nome!");

        const cargo = await prismaClient.cargo.create({
            data: {
                nome: nome,
                salariobase: salariobase,
                iddepartamento: iddepartamento
            },
            select: {
                idcargo: true,
                nome: true
            }
        })

        return cargo;
    }
}

export { PostCargoService };