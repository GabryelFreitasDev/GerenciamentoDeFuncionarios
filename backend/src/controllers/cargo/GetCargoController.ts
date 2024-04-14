import { Request, Response } from "express";
import { GetCargoService } from "../../services/cargo/GetCargoService";

class GetCargoController {
    async handle(req: Request, res: Response){
        const idcargo = req.params.idcargo;
        const getCargoService = new GetCargoService();

        const cargo = await getCargoService.execute(idcargo);

        return res.json(cargo);
    }
}

export { GetCargoController }