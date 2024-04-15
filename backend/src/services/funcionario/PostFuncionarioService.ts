import { FuncionarioDTO } from '../../dtos/FuncionarioDTO';
import prismaClient from '../../prisma/prismaclient'

class PostFuncionarioService {
    async Post({ nome, idcargo, categoria, dataadmissao, idusuariocadastro }: FuncionarioDTO) {
       
        const funcionarioJaExite = await prismaClient.funcionario.findFirst({ where: { nome: nome } })
        if (funcionarioJaExite)
            throw new Error("Já existe um funcionario com esse nome!");

        const funcionario = await prismaClient.funcionario.create({
            data: {
               // codigo: codigo,
                nome: nome,
               // iddepartamento: iddepartamento,
                idcargo: idcargo,
                categoria: categoria,
                dataadmissao: dataadmissao,
                idusuariocadastro: idusuariocadastro
            },
            select: {
                idfuncionario: true,
                //codigo: true,
                nome: true,
                //iddepartamento: true,
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
               // codigo: codigo,
                nome: nome,
               // iddepartamento: iddepartamento,
                idcargo: idcargo,
                categoria: categoria,
                dataadmissao: dataadmissao,
                idusuariocadastro: idusuariocadastro
            },
            select: {
                idfuncionario: true,
                //codigo: true,
                nome: true,
                //iddepartamento: true,
                idcargo: true,
                categoria: true,
                dataadmissao: true,
                idusuariocadastro: true
            },
            where: { idfuncionario: idfuncionario }
        })
        return funcionario;
    }
}

export { PostFuncionarioService };