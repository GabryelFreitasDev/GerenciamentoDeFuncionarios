import { Request, Response } from "express";
import { PostDescontosService } from '../../services/descontos/PostDescontosService'
import { DescontosDTO } from "../../dtos/DescontosDTO";

class PostDescontosController {
    async handle(req: Request, res: Response) {
        const descontosDTO: DescontosDTO = req.body;
        const cadastrarDescontosService = new PostDescontosService();

        const descontos = await cadastrarDescontosService.execute(descontosDTO);

        return res.json(descontos);
    }
}

export { PostDescontosController };