import prismaClient from "../../prisma/prismaclient";

class GetCargoService {
    async execute(idcargo: string) {
        const cargo = await prismaClient.cargo.findFirst(
            {
                where: {
                    idcargo: idcargo
                },
                select: {
                    idcargo: true,
                    nome: true,
                    salariobase: true,
                    iddepartamento: true
                }
            });

        if (!cargo)
            throw new Error("Cargo não encontrado.");

        return cargo;
    }
}

export { GetCargoService }