import { Request, Response } from "express";
import { PostBeneficiosService } from '../../services/beneficios/PostBeneficiosService'

class PostBeneficiosController {
    async handle(req: Request, res: Response) {
        const beneficiosDTO: BeneficiosDTO  = req.body;
        const cadastrarBeneficiosService = new PostBeneficiosService();

        const beneficios = await cadastrarBeneficiosService.execute(beneficiosDTO);

        return res.json(beneficios);
    }
}

export { PostBeneficiosController };