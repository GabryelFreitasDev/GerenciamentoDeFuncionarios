import { Request, Response } from "express";
import { GetAdicionaisService } from "../../services/adicionais/GetAdicionaisService";

class GetAdicionaisController {
    async handle(req: Request, res: Response){
        const idadicionais = req.params.idadicionais;
        const getAdicionaisService = new GetAdicionaisService();

        const adicionais = await getAdicionaisService.execute(idadicionais);

        return res.json(adicionais);
    }
}

export { GetAdicionaisController }