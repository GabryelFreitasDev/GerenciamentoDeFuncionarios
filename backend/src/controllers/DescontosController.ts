import { Request, Response } from "express";
import { DescontosDTO } from "../dtos/DescontosDTO";
import { DescontosService } from "../services/DescontosService";

class DescontosController {
    async Get(req: Request, res: Response){
        const iddescontos = req.params.iddescontos;
        const getDescontosService = new DescontosService();

        const descontos = await getDescontosService.Get(iddescontos);

        return res.json(descontos);
    }

    async Post(req: Request, res: Response) {
        const descontosDTO: DescontosDTO = req.body;
        const cadastrarDescontosService = new DescontosService();

        const descontos = await cadastrarDescontosService.Post(descontosDTO);

        return res.json(descontos);
    }
}

export { DescontosController }