import { Request, Response } from "express";
import { GetDescontosService } from "../../services/descontos/GetDescontosService";

class GetDescontosController {
    async handle(req: Request, res: Response){
        const iddescontos = req.params.iddescontos;
        const getDescontosService = new GetDescontosService();

        const descontos = await getDescontosService.execute(iddescontos);

        return res.json(descontos);
    }
}

export { GetDescontosController }