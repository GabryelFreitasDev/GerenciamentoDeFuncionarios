import { Request, Response } from "express";
import { GetUsuarioService } from "../../services/usuario/GetUsuarioService";
import { PostUsuarioService } from "../../services/usuario/PostUsuarioService";
import { AutenticarUsuarioService } from "../../services/usuario/AutenticarUsuarioService";

class GetUsuarioController {
    async handle(req: Request, res: Response){
        const idusuario = req.params.idusuario;
        const detalhesUsuarioService = new GetUsuarioService();

        const usuario = await detalhesUsuarioService.execute(idusuario);

        return res.json(usuario);
    }
}

export { GetUsuarioController }