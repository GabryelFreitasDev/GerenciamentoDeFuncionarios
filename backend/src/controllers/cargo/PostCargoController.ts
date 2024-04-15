import { Request, Response } from "express";
import { PostCargoService } from '../../services/cargo/PostCargoService'
import { CargoDTO } from "../../dtos/CargoDTO";

class PostCargoController {
    async handle(req: Request, res: Response) {
        const cargoDTO: CargoDTO  = req.body;
        const cadastrarCargoService = new PostCargoService();

        const cargo = await cadastrarCargoService.execute(cargoDTO);

        return res.json(cargo);
    }
}

export { PostCargoController };