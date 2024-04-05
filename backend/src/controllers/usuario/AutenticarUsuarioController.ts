import { Request, Response } from "express";
import { AutenticarUsuarioService } from '../../services/usuario/AutenticarUsuarioService'

class AutenticarUsuarioController{
    async handle(req: Request, res: Response){
        const { login, senha } = req.body;
        const autenticarUsuarioService = new AutenticarUsuarioService();

        const usuario = await autenticarUsuarioService.execute({ login, senha }); 

        return res.json(usuario);
    }
}

export { AutenticarUsuarioController };