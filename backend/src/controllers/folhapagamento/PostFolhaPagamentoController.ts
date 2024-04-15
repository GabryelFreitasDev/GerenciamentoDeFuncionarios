import { Request, Response } from "express";
import { PostFolhaPagamentoService } from '../../services/folhapagamento/PostFolhaPagamentoService'
import { FolhaPagamentoDTO } from "../../dtos/FolhaPagamentoDTO";

class PostFolhaPagamentoController {
    async handle(req: Request, res: Response) {
        const folhapagamentoDTO: FolhaPagamentoDTO  = req.body;
        const cadastrarFolhaPagamentoService = new PostFolhaPagamentoService();

        const folhapagamento = await cadastrarFolhaPagamentoService.execute(folhapagamentoDTO);

        return res.json(folhapagamento);
    }
}

export { PostFolhaPagamentoController };