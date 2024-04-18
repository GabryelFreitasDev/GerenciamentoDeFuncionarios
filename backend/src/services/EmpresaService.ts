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
}

export { EmpresaService }