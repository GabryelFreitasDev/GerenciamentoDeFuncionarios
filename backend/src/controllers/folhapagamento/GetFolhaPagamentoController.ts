import { Request, Response } from "express";
import { GetFolhaPagamentoService } from "../../services/folhapagamento/GetFolhaPagamentoService";

class GetFolhaPagamentoController {
    async handle(req: Request, res: Response){
        const idfolhapagamento = req.params.idfolhapagamento;
        const getFolhaPagamentoService = new GetFolhaPagamentoService();

        const folhapagamento = await getFolhaPagamentoService.execute(idfolhapagamento);

        return res.json(folhapagamento);
    }
}

export { GetFolhaPagamentoController }