import { Router, Request, Response } from 'express'
import { GetUsuarioController } from './controllers/usuario/GetUsuarioController';
import { AutenticarUsuarioController } from './controllers/usuario/AutenticarUsuarioController';
import { PostUsuarioController } from './controllers/usuario/PostUsuarioController';

const router = Router();

//usuario

//get
router.get('/GetUsuario', new GetUsuarioController().handle);

//post
router.post('/CadastrarUsuario', new PostUsuarioController().handle);
router.post('/AutenticarUsuario', new AutenticarUsuarioController().handle);

export { router };