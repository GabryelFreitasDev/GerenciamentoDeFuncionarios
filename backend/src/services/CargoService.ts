
import { CargoDTO } from "../dtos/CargoDTO";
import prismaClient from "../prisma/prismaclient";

class CargoService {
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

    async Post({ nome, salariobase, iddepartamento }: CargoDTO) {

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

export { CargoService }