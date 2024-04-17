import { Request, Response } from "express";
import { PostFuncionarioService } from '../../services/funcionario/PostFuncionarioService'
import { FuncionarioDTO } from "../../dtos/FuncionarioDTO";

class PostFuncionarioController {
    async Post(req: Request, res: Response) {
        
        const funcionarioDTO: FuncionarioDTO  = req.body;
        
        const cadastrarFuncionarioService = new PostFuncionarioService();

        const funcionario = await cadastrarFuncionarioService.Post(funcionarioDTO);

        return res.json(funcionario);
    }

    async Put(req: Request, res: Response) {
        
        const funcionarioDTO: FuncionarioDTO  = req.body;
        
        const cadastrarFuncionarioService = new PostFuncionarioService();

        const funcionario = await cadastrarFuncionarioService.Put(funcionarioDTO);

        return res.json(funcionario);
    }

    async Delete(req: Request, res: Response) {
        
        const idfuncionario = req.query.idfuncionario?.toString() ?? '';
        
        const cadastrarFuncionarioService = new PostFuncionarioService();

        const funcionario = await cadastrarFuncionarioService.Delete(idfuncionario);

        return res.json(funcionario);
    }
}

export { PostFuncionarioController };
