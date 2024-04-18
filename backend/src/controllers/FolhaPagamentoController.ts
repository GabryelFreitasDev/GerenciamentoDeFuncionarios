import { Request, Response } from "express";
import { FolhaPagamentoDTO } from "../dtos/FolhaPagamentoDTO";
import { FolhaPagamentoService } from "../services/FolhaPagamentoService";

class FolhaPagamentoController {
    async Get(req: Request, res: Response){
        const idfolhapagamento = req.params.idfolhapagamento;
        const getFolhaPagamentoService = new FolhaPagamentoService();

        const folhapagamento = await getFolhaPagamentoService.Get(idfolhapagamento);

        return res.json(folhapagamento);
    }

    async GetByIDFuncionario(req: Request, res: Response){
        const idfuncionario = req.params.idfuncionario;
        const getFolhaPagamentoService = new FolhaPagamentoService();

        const folhapagamento = await getFolhaPagamentoService.GetByIDFuncionario(idfuncionario);

        return res.json(folhapagamento);
    }

    async Post(req: Request, res: Response) {
        const folhapagamentoDTO: FolhaPagamentoDTO  = req.body;
        const cadastrarFolhaPagamentoService = new FolhaPagamentoService();

        const folhapagamento = await cadastrarFolhaPagamentoService.Post(folhapagamentoDTO);

        return res.json(folhapagamento);
    }

    async Put(req: Request, res: Response) {
        
        const folhaPagamentoDTO: FolhaPagamentoDTO  = req.body;
        
        const cadastrarFolhaPagamentoService = new FolhaPagamentoService();

        const folhaPagamento = await cadastrarFolhaPagamentoService.Put(folhaPagamentoDTO);

        return res.json(folhaPagamento);
    }

    async Delete(req: Request, res: Response) {
        
        const idfolhapagamento = req.query.idfolhapagamento?.toString() ?? '';
        
        const cadastrarFolhaPagamentoService = new FolhaPagamentoService();

        const folhaPagamento = await cadastrarFolhaPagamentoService.Delete(idfolhapagamento);

        return res.json(folhaPagamento);
    }
}

export { FolhaPagamentoController }