import { Request, Response } from "express";
import { AdicionaisDTO } from "../dtos/AdicionaisDTO";
import { AdicionaisService } from "../services/AdicionaisService";

class AdicionaisController {
    async Get(req: Request, res: Response){
        const idadicionais = req.params.idadicionais;
        const getAdicionaisService = new AdicionaisService();

        const adicionais = await getAdicionaisService.Get(idadicionais);

        return res.json(adicionais);
    }

    async Post(req: Request, res: Response) {
        const adicionaisDTO: AdicionaisDTO  = req.body;
        const cadastrarAdicionaisService = new AdicionaisService();

        const adicionais = await cadastrarAdicionaisService.Post(adicionaisDTO);

        return res.json(adicionais);
    }
}

export { AdicionaisController }