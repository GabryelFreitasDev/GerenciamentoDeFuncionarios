import { Request, Response } from "express";
import { GetCargoService } from "../../services/cargo/GetCargoService";

class GetCargoController {
    async Get(req: Request, res: Response){
        const idcargo = req.params.idcargo;
        const getCargoService = new GetCargoService();

        const cargo = await getCargoService.Get(idcargo);

        return res.json(cargo);
    }

    async GetAll(req: Request, res: Response){
        const getCargoService = new GetCargoService();

        const funcionario = await getCargoService.GetAll();

        return res.json(funcionario);
    }
}

export { GetCargoController }