import { Request, Response } from "express";
import { EmpresaDTO } from "../dtos/EmpresaDTO";
import { EmpresaService } from "../services/EmpresaService";

class EmpresaController {
    async Get(req: Request, res: Response){
        const idempresa = req.params.idempresa;
        const getEmpresaService = new EmpresaService();

        const empresa = await getEmpresaService.Get(idempresa);

        return res.json(empresa);
    }

    async Post(req: Request, res: Response) {
        const empresaDTO: EmpresaDTO  = req.body;
        const cadastrarEmpresaService = new EmpresaService();

        const empresa = await cadastrarEmpresaService.Post(empresaDTO);

        return res.json(empresa);
    }

    async Put(req: Request, res: Response) {
        
        const empresaDTO: EmpresaDTO  = req.body;
        
        const cadastrarEmpresaService = new EmpresaService();

        const empresa = await cadastrarEmpresaService.Put(empresaDTO);

        return res.json(empresa);
    }

    async Delete(req: Request, res: Response) {
        
        const idempresa = req.query.idempresa?.toString() ?? '';
        
        const cadastrarEmpresaService = new EmpresaService();

        const empresa = await cadastrarEmpresaService.Delete(idempresa);

        return res.json(empresa);
    }
}

export { EmpresaController }