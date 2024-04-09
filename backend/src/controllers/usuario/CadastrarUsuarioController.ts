import { Request, Response } from "express";
import { CadastrarUsuarioService } from '../../services/usuario/PostUsuarioService'

class CadastrarUsuarioController {
    async handle(req: Request, res: Response) {
        const { nome, login, email, senha } = req.body;
        const cadastrarUsuarioService = new CadastrarUsuarioService();

        const usuario = await cadastrarUsuarioService.execute({ nome, login, email, senha });

        return res.json(usuario);
    }
}

export { CadastrarUsuarioController };