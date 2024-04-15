import { Request, Response } from "express";
import { PostHorasTrabalhadasService } from '../../services/horastrabalhadas/PostHorasTrabalhadasService'
import { HorasTrabalhadasDTO } from "../../dtos/HorasTrabalhadasDTO";

class PostHorasTrabalhadasController {
    async handle(req: Request, res: Response) {
        const horastrabalhadasDTO: HorasTrabalhadasDTO  = req.body;
        const cadastrarHorasTrabalhadasService = new PostHorasTrabalhadasService();

        const horastrabalhadas = await cadastrarHorasTrabalhadasService.execute(horastrabalhadasDTO);

        return res.json(horastrabalhadas);
    }
}

export { PostHorasTrabalhadasController };