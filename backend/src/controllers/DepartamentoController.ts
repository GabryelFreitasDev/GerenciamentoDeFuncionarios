import { Request, Response } from "express";
import { DepartamentoDTO } from "../dtos/DepartamentoDTO";
import { DepartamentoService } from "../services/DepartamentoService";

class DepartamentoController {
    async Get(req: Request, res: Response){
        const iddepartamento = req.params.iddepartamento;
        const getDepartamentoService = new DepartamentoService();

        const departamento = await getDepartamentoService.Get(iddepartamento);

        return res.json(departamento);
    }

    async Post(req: Request, res: Response) {
        const departamentoDTO: DepartamentoDTO  = req.body;
        const cadastrarDepartamentoService = new DepartamentoService();

        const departamento = await cadastrarDepartamentoService.Post(departamentoDTO);

        return res.json(departamento);
    }
}

export { DepartamentoController }