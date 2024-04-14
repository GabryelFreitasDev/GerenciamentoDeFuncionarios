import { Request, Response } from "express";
import { PostUsuarioService } from '../../services/usuario/PostUsuarioService'

class PostUsuarioController {
    async handle(req: Request, res: Response) {
        const { nome, login, email, senha, idempresa } = req.body;
        const cadastrarUsuarioService = new PostUsuarioService();

        const usuario = await cadastrarUsuarioService.execute({ nome, login, email, senha, idempresa });

        return res.json(usuario);
    }
}

export { PostUsuarioController };