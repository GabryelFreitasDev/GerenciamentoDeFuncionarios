import prismaClient from "../../prisma/prismaclient";

class GetCargoService {
    async Get(idcargo: string) {
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

    async GetAll() {
        const cargo = await prismaClient.cargo.findMany(
            {
                select: {
                    idcargo: true,
                    nome: true,
                    salariobase: true,
                    iddepartamento: true
                }
            });

        if (!cargo)
            throw new Error("Cargos não encontrados.");

        return cargo;
    }
}

export { GetCargoService }