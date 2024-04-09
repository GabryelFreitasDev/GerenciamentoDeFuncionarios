import prismaClient from '../../prisma/prismaclient'

interface CargoRequest {
    nome: string,
    salariobase: number,
    iddepartamento: string
}

class PostCargoService {
    async execute({ nome, salariobase, iddepartamento  }: CargoRequest) {

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