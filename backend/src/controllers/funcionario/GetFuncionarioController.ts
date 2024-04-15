import { Request, Response } from "express";
import { GetFuncionarioService } from "../../services/funcionario/GetFuncionarioService";

class GetFuncionarioController {
    async Get(req: Request, res: Response){
        const idfuncionario = req.params.idfuncionario;
        const getFuncionarioService = new GetFuncionarioService();

        const funcionario = await getFuncionarioService.Get(idfuncionario);

        return res.json(funcionario);
    }

    async GetAll(req: Request, res: Response){
        const getFuncionarioService = new GetFuncionarioService();

        const funcionario = await getFuncionarioService.GetAll();

        return res.json(funcionario);
    }
}

export { GetFuncionarioController }