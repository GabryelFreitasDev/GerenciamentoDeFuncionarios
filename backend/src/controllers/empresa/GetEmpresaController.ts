import { Request, Response } from "express";
import { GetEmpresaService } from "../../services/empresa/GetEmpresaService";

class GetEmpresaController {
    async handle(req: Request, res: Response){
        const idempresa = req.params.idempresa;
        const getEmpresaService = new GetEmpresaService();

        const empresa = await getEmpresaService.execute(idempresa);

        return res.json(empresa);
    }
}

export { GetEmpresaController }