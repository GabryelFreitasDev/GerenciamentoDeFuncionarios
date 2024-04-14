import { Request, Response } from "express";
import { GetDepartamentoService } from "../../services/departamento/GetDepartamentoService";

class GetDepartamentoController {
    async handle(req: Request, res: Response){
        const iddepartamento = req.params.iddepartamento;
        const getDepartamentoService = new GetDepartamentoService();

        const departamento = await getDepartamentoService.execute(iddepartamento);

        return res.json(departamento);
    }
}

export { GetDepartamentoController }