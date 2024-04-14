import { Router, Request, Response } from 'express'
import { GetUsuarioController } from './controllers/usuario/GetUsuarioController';
import { AutenticarUsuarioController } from './controllers/usuario/AutenticarUsuarioController';
import { PostUsuarioController } from './controllers/usuario/PostUsuarioController';
import { GetEmpresaController } from './controllers/empresa/GetEmpresaController';
import { PostEmpresaController } from './controllers/empresa/PostEmpresaController';
import { GetDepartamentoController } from './controllers/departamento/GetDepartamentoController';
import { PostDepartamentoController } from './controllers/departamento/PostDepartamentoController';
import { GetCargoController } from './controllers/cargo/GetCargoController';
import { PostCargoController } from './controllers/cargo/PostCargoController';
import { GetAdicionaisController } from './controllers/adicionais/GetAdicionaisController';
import { PostAdicionaisController } from './controllers/adicionais/PostAdicionaisController';
import { GetBeneficiosController } from './controllers/beneficios/GetBeneficiosController';
import { PostBeneficiosController } from './controllers/beneficios/PostBeneficiosController';
import { GetFuncionarioController } from './controllers/funcionario/GetFuncionarioController';
import { PostFuncionarioController } from './controllers/funcionario/PostFuncionarioController';
import { GetHorasTrabalhadasController } from './controllers/horastrabalhadas/GetHorasTrabalhadasController';
import { PostHorasTrabalhadasController } from './controllers/horastrabalhadas/PostHorasTrabalhadasController';
import { PostFolhaPagamentoController } from './controllers/folhapagamento/PostFolhaPagamentoController';
import { GetDescontosController } from './controllers/descontos/GetDescontosController';
import { PostDescontosController } from './controllers/descontos/PostDescontosController';
import { GetFolhaPagamentoController } from './controllers/folhapagamento/GetFolhaPagamentoController';

const router = Router();

//get
router.get('/Empresa', new GetEmpresaController().handle);
//post
router.post('/Empresa', new PostEmpresaController().handle);

//get
router.get('/Usuario', new GetUsuarioController().handle);
//post
router.post('/Usuario', new PostUsuarioController().handle);
router.post('/Usuario/AutenticarUsuario', new AutenticarUsuarioController().handle);

//get
router.get('/Departamento', new GetDepartamentoController().handle);
//post
router.post('/Departamento', new PostDepartamentoController().handle);

//get
router.get('/Cargo', new GetCargoController().handle);
//post
router.post('/Cargo', new PostCargoController().handle);

//get
router.get('/Funcionario', new GetFuncionarioController().handle);
//post
router.post('/Funcionario', new PostFuncionarioController().handle);

//get
router.get('/Beneficios', new GetBeneficiosController().handle);
//post
router.post('/Beneficios', new PostBeneficiosController().handle);

//get
router.get('/Adicionais', new GetAdicionaisController().handle);
//post
router.post('/Adicionais', new PostAdicionaisController().handle);

//get
router.get('/HorasTrabalhadas', new GetHorasTrabalhadasController().handle);
//post
router.post('/HorasTrabalhadas', new PostHorasTrabalhadasController().handle);

//get
router.get('/Descontos', new GetDescontosController().handle);
//post
router.post('/Descontos', new PostDescontosController().handle);

//get
router.get('/FolhaPagamento', new GetFolhaPagamentoController().handle);
//post
router.post('/FolhaPagamento', new PostFolhaPagamentoController().handle);


export { router };