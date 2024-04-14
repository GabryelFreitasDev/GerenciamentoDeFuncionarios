import { Request, Response } from "express";
import { GetFuncionarioService } from "../../services/funcionario/GetFuncionarioService";

class GetFuncionarioController {
    async handle(req: Request, res: Response){
        const idfuncionario = req.params.idfuncionario;
        const getFuncionarioService = new GetFuncionarioService();

        const funcionario = await getFuncionarioService.execute(idfuncionario);

        return res.json(funcionario);
    }
}

export { GetFuncionarioController }