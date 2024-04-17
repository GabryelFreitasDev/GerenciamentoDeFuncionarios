import { Request, Response } from "express";
import { FuncionarioService } from "../services/FuncionarioService";
import { FuncionarioDTO } from "../dtos/FuncionarioDTO";

class FuncionarioController {
    async Get(req: Request, res: Response){
        const idfuncionario = req.params.idfuncionario;
        const getFuncionarioService = new FuncionarioService();

        const funcionario = await getFuncionarioService.Get(idfuncionario);

        return res.json(funcionario);
    }

    async GetAll(req: Request, res: Response){
        const getFuncionarioService = new FuncionarioService();

        const funcionario = await getFuncionarioService.GetAll();

        return res.json(funcionario);
    }
    async Post(req: Request, res: Response) {
        
        const funcionarioDTO: FuncionarioDTO  = req.body;
        
        const cadastrarFuncionarioService = new FuncionarioService();

        const funcionario = await cadastrarFuncionarioService.Post(funcionarioDTO);

        return res.json(funcionario);
    }

    async Put(req: Request, res: Response) {
        
        const funcionarioDTO: FuncionarioDTO  = req.body;
        
        const cadastrarFuncionarioService = new FuncionarioService();

        const funcionario = await cadastrarFuncionarioService.Put(funcionarioDTO);

        return res.json(funcionario);
    }

    async Delete(req: Request, res: Response) {
        
        const idfuncionario = req.query.idfuncionario?.toString() ?? '';
        
        const cadastrarFuncionarioService = new FuncionarioService();

        const funcionario = await cadastrarFuncionarioService.Delete(idfuncionario);

        return res.json(funcionario);
    }
}

export { FuncionarioController }