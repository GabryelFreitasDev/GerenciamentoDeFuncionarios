import { Request, Response } from "express";
import { HorasTrabalhadasDTO } from "../dtos/HorasTrabalhadasDTO";
import { HorasTrabalhadasService } from "../services/HorasTrabalhadasService";

class HorasTrabalhadasController {
    async Get(req: Request, res: Response){
        const idhorastrabalhadas = req.params.idhorastrabalhadas;
        const getHorasTrabalhadasService = new HorasTrabalhadasService();

        const horastrabalhadas = await getHorasTrabalhadasService.Get(idhorastrabalhadas);

        return res.json(horastrabalhadas);
    }

    async Post(req: Request, res: Response) {
        const horastrabalhadasDTO: HorasTrabalhadasDTO  = req.body;
        const cadastrarHorasTrabalhadasService = new HorasTrabalhadasService();

        const horastrabalhadas = await cadastrarHorasTrabalhadasService.Post(horastrabalhadasDTO);

        return res.json(horastrabalhadas);
    }
}

export { HorasTrabalhadasController }