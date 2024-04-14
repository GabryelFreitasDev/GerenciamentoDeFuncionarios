import { Request, Response } from "express";
import { GetUsuarioService } from "../../services/usuario/GetUsuarioService";

class GetUsuarioController {
    async handle(req: Request, res: Response){
        const idusuario = req.params.idusuario;
        const getUsuarioService = new GetUsuarioService();

        const usuario = await getUsuarioService.execute(idusuario);

        return res.json(usuario);
    }
}

export { GetUsuarioController }