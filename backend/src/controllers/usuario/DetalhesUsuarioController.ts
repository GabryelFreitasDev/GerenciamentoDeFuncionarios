import { Request, Response } from "express";
import { DetalhesUsuarioService } from "../../services/usuario/GetUsuarioService";

class DetalhesUsuarioController {
    async handle(req: Request, res: Response){
        const idusuario = req.params.idusuario;
        const detalhesUsuarioService = new DetalhesUsuarioService();

        const usuario = await detalhesUsuarioService.execute(idusuario);

        return res.json(usuario);
    }
}

export { DetalhesUsuarioController }