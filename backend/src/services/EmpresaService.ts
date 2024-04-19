import { EmpresaDTO } from "../dtos/EmpresaDTO";
import prismaClient from "../prisma/prismaclient";

class EmpresaService {
    async Get(idempresa: string) {
        const empresa = await prismaClient.empresa.findFirst(
            {
                where: {
                    idempresa: idempresa
                }
            });

        return empresa;
    }

    async GetAll() {
        const empresa = await prismaClient.empresa.findMany(
            {
                select: {
                    idempresa: true,
                    nome: true,
                    cnpj: true,
                    endereco: true
                }
            });

        if (!empresa)
            throw new Error("Empresas não encontradas.");

        return empresa;
    }

    async Post({ nome, cnpj, endereco }: EmpresaDTO) {

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

    async Put({ idempresa, cnpj, endereco, nome }: EmpresaDTO) {

        const empresa = await prismaClient.empresa.update({
            data: {
                cnpj: cnpj,
                endereco: endereco,
                nome: nome
            },
            select: {
                idempresa: true,
                cnpj: true,
                endereco: true,
                nome: true
            },
            where: { idempresa: idempresa }
        })
        return empresa;
    }

    async Delete(idEmpresa: string) {
        const empresa = await prismaClient.empresa.delete({
            select: {
                idempresa: true,
                cnpj: true,
                endereco: true,
                nome: true
            },
            where: { idempresa: idEmpresa }
        })
        return empresa;
    }
}

export { EmpresaService }