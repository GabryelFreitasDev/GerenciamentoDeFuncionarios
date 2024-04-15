import { Request, Response } from "express";
import { PostUsuarioService } from '../../services/usuario/PostUsuarioService'
import { UsuarioDTO } from "../../dtos/UsuarioDTO";

class PostUsuarioController {
    async handle(req: Request, res: Response) {
        const usuarioDTO: UsuarioDTO = req.body;
        const postUsuarioService = new PostUsuarioService();

        const usuario = await postUsuarioService.execute(
            {
                nome: usuarioDTO.nome,
                login: usuarioDTO.login,
                email: usuarioDTO.email, 
                senha: usuarioDTO.senha,
                idempresa: usuarioDTO.idempresa
             });

        return res.json(usuario);
    }
}

export { PostUsuarioController };