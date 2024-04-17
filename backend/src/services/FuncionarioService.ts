import { FuncionarioDTO } from "../dtos/FuncionarioDTO";
import prismaClient from "../prisma/prismaclient";

export class FuncionarioService {
    async Get(idfuncionario: string) {
        const funcionario = await prismaClient.funcionario.findFirst(
            {
                where: {
                    idfuncionario: idfuncionario
                },
                select: {
                    idfuncionario: true,
                    nome: true,
                    idcargo: true,
                    categoria: true,
                    dataadmissao: true,
                    idusuariocadastro: true
                }
            });

        if (!funcionario)
            throw new Error("Funcionario não encontrado.");

        return funcionario;
    }

    async GetAll() {
        const funcionario = await prismaClient.funcionario.findMany(
            {
                select: {
                    idfuncionario: true,
                    nome: true,
                    idcargo: true,
                    categoria: true,
                    dataadmissao: true,
                    idusuariocadastro: true
                }
            });

        if (!funcionario)
            throw new Error("Funcionarios não encontrados.");

        return funcionario;
    }

    async Post({ nome, idcargo, categoria, dataadmissao, idusuariocadastro }: FuncionarioDTO) {
       
        const funcionarioJaExite = await prismaClient.funcionario.findFirst({ where: { nome: nome } })
        if (funcionarioJaExite)
            throw new Error("Já existe um funcionario com esse nome!");

        const funcionario = await prismaClient.funcionario.create({
            data: {
                nome: nome,
                idcargo: idcargo,
                categoria: categoria,
                dataadmissao: dataadmissao,
                idusuariocadastro: idusuariocadastro
            },
            select: {
                idfuncionario: true,
                nome: true,
                idcargo: true,
                categoria: true,
                dataadmissao: true,
                idusuariocadastro: true
            }
        })
        return funcionario;
    }

    async Put({ idfuncionario, nome, idcargo, categoria, dataadmissao, idusuariocadastro }: FuncionarioDTO) {
        
        const funcionario = await prismaClient.funcionario.update({
            data: {
                nome: nome,
                idcargo: idcargo,
                categoria: categoria,
                dataadmissao: dataadmissao,
                idusuariocadastro: idusuariocadastro
            },
            select: {
                idfuncionario: true,
                nome: true,
                idcargo: true,
                categoria: true,
                dataadmissao: true,
                idusuariocadastro: true
            },
            where: { idfuncionario: idfuncionario }
        })
        return funcionario;
    }

    async Delete(idFuncionario: string) {
        const funcionario = await prismaClient.funcionario.delete({
            select: {
                idfuncionario: true,
                nome: true,
                idcargo: true,
                categoria: true,
                dataadmissao: true,
                idusuariocadastro: true
            },
            where: { idfuncionario: idFuncionario }
        })
        return funcionario;
    }
}