import { Request, Response } from "express";
import { GetBeneficiosService } from "../../services/beneficios/GetBeneficiosService";

class GetBeneficiosController {
    async handle(req: Request, res: Response){
        const idbeneficios = req.params.idbeneficios;
        const getBeneficiosService = new GetBeneficiosService();

        const beneficios = await getBeneficiosService.execute(idbeneficios);

        return res.json(beneficios);
    }
}

export { GetBeneficiosController }