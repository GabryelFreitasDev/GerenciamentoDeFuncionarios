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

    async Put(req: Request, res: Response) {
        
        const horasTrabalhadasDTO: HorasTrabalhadasDTO  = req.body;
        
        const cadastrarHorasTrabalhadasService = new HorasTrabalhadasService();

        const horasTrabalhadas = await cadastrarHorasTrabalhadasService.Put(horasTrabalhadasDTO);

        return res.json(horasTrabalhadas);
    }

    async Delete(req: Request, res: Response) {
        
        const idhorastrabalhadas = req.query.idhorastrabalhadas?.toString() ?? '';
        
        const cadastrarHorasTrabalhadasService = new HorasTrabalhadasService();

        const horasTrabalhadas = await cadastrarHorasTrabalhadasService.Delete(idhorastrabalhadas);

        return res.json(horasTrabalhadas);
    }
}

export { HorasTrabalhadasController }