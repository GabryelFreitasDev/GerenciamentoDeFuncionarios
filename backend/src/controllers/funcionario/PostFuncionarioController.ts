import { Request, Response } from "express";
import { PostFuncionarioService } from '../../services/funcionario/PostFuncionarioService'

class PostFuncionarioController {
    async handle(req: Request, res: Response) {
        const funcionarioDTO: FuncionarioDTO  = req.body;
        const cadastrarFuncionarioService = new PostFuncionarioService();

        const funcionario = await cadastrarFuncionarioService.execute(funcionarioDTO);

        return res.json(funcionario);
    }
}

export { PostFuncionarioController };