import { Request, Response } from "express";
import { CargoDTO } from "../dtos/CargoDTO";
import { CargoService } from "../services/CargoService";

class CargoController {
    async Get(req: Request, res: Response){
        const idcargo = req.params.idcargo;
        const getCargoService = new CargoService();

        const cargo = await getCargoService.Get(idcargo);

        return res.json(cargo);
    }

    async GetAll(req: Request, res: Response){
        const getCargoService = new CargoService();

        const funcionario = await getCargoService.GetAll();

        return res.json(funcionario);
    }

    async Post(req: Request, res: Response) {
        const cargoDTO: CargoDTO  = req.body;
        const cadastrarCargoService = new CargoService();

        const cargo = await cadastrarCargoService.Post(cargoDTO);

        return res.json(cargo);
    }
}

export { CargoController }