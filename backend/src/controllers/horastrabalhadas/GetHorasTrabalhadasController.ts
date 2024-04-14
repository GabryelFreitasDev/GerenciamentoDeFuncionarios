import { Request, Response } from "express";
import { GetHorasTrabalhadasService } from "../../services/horastrabalhadas/GetHorasTrabalhadasService";

class GetHorasTrabalhadasController {
    async handle(req: Request, res: Response){
        const idhorastrabalhadas = req.params.idhorastrabalhadas;
        const getHorasTrabalhadasService = new GetHorasTrabalhadasService();

        const horastrabalhadas = await getHorasTrabalhadasService.execute(idhorastrabalhadas);

        return res.json(horastrabalhadas);
    }
}

export { GetHorasTrabalhadasController }