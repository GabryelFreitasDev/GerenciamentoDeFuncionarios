import { Request, Response } from "express";
import { PostAdicionaisService } from '../../services/adicionais/PostAdicionaisService'

class PostAdicionaisController {
    async handle(req: Request, res: Response) {
        const adicionaisDTO: AdicionaisDTO  = req.body;
        const cadastrarAdicionaisService = new PostAdicionaisService();

        const adicionais = await cadastrarAdicionaisService.execute(adicionaisDTO);

        return res.json(adicionais);
    }
}

export { PostAdicionaisController };