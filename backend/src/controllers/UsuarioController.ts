import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { UsuarioDTO } from "../dtos/UsuarioDTO";

class UsuarioController {
    async Get(req: Request, res: Response){
        const idusuario = req.params.idusuario;
        const getUsuarioService = new UsuarioService();

        const usuario = await getUsuarioService.Get(idusuario);

        return res.json(usuario);
    }

    async AutenticarUsuario(req: Request, res: Response){
        const { login, senha } = req.body;
        const autenticarUsuarioService = new UsuarioService();

        const usuario = await autenticarUsuarioService.AutenticarUsuario({ login, senha }); 

        return res.json(usuario);
    }

    async Post(req: Request, res: Response) {
        const usuarioDTO: UsuarioDTO = req.body;
        const postUsuarioService = new UsuarioService();

        const usuario = await postUsuarioService.Post(
            {
                nome: usuarioDTO.nome,
                login: usuarioDTO.login,
                email: usuarioDTO.email, 
                senha: usuarioDTO.senha,
                idempresa: usuarioDTO.idempresa
             });

        return res.json(usuario);
    }

    async Put(req: Request, res: Response) {
        
        const usuarioDTO: UsuarioDTO  = req.body;
        
        const cadastrarUsuarioService = new UsuarioService();

        const usuario = await cadastrarUsuarioService.Put(usuarioDTO);

        return res.json(usuario);
    }

    async Delete(req: Request, res: Response) {
        
        const idusuario = req.query.idusuario?.toString() ?? '';
        
        const cadastrarUsuarioService = new UsuarioService();

        const usuario = await cadastrarUsuarioService.Delete(idusuario);

        return res.json(usuario);
    }
    
}

export { UsuarioController }