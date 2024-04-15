import { Request, Response } from "express";
import { PostDepartamentoService } from '../../services/departamento/PostDepartamentoService'
import { DepartamentoDTO } from "../../dtos/DepartamentoDTO";

class PostDepartamentoController {
    async handle(req: Request, res: Response) {
        const departamentoDTO: DepartamentoDTO  = req.body;
        const cadastrarDepartamentoService = new PostDepartamentoService();

        const departamento = await cadastrarDepartamentoService.execute(departamentoDTO);

        return res.json(departamento);
    }
}

export { PostDepartamentoController };