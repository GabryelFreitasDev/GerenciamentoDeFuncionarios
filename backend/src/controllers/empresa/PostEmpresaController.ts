import { Request, Response } from "express";
import { PostEmpresaService } from '../../services/empresa/PostEmpresaService'

class PostEmpresaController {
    async handle(req: Request, res: Response) {
        const empresaDTO: EmpresaDTO  = req.body;
        const cadastrarEmpresaService = new PostEmpresaService();

        const empresa = await cadastrarEmpresaService.execute(empresaDTO);

        return res.json(empresa);
    }
}

export { PostEmpresaController };