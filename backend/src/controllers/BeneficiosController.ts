import { Request, Response } from "express";
import { BeneficiosDTO } from "../dtos/BeneficiosDTO";
import { BeneficiosService } from "../services/BeneficiosService";

class BeneficiosController {
    async Get(req: Request, res: Response){
        const idbeneficios = req.params.idbeneficios;
        const getBeneficiosService = new BeneficiosService();

        const beneficios = await getBeneficiosService.Get(idbeneficios);

        return res.json(beneficios);
    }

    async Post(req: Request, res: Response) {
        const beneficiosDTO: BeneficiosDTO  = req.body;
        const cadastrarBeneficiosService = new BeneficiosService();

        const beneficios = await cadastrarBeneficiosService.Post(beneficiosDTO);

        return res.json(beneficios);
    }
}

export { BeneficiosController }