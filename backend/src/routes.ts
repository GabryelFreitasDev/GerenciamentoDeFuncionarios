import { Router, Request, Response } from 'express'

import { CadastrarUsuarioController } from './controllers/usuario/CadastrarUsuarioController'
import { AutenticarUsuarioController } from './controllers/usuario/AutenticarUsuarioController';
import { DetalhesUsuarioController } from './controllers/usuario/DetalhesUsuarioController';

const router = Router();

//Rotas -usuario-
//get
router.get('/GetUsuario', new DetalhesUsuarioController().handle);

//post
router.post('/CadastrarUsuario', new CadastrarUsuarioController().handle);
router.post('/AutenticarUsuario', new AutenticarUsuarioController().handle);

export { router };