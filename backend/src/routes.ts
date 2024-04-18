import { Router, Request, Response } from 'express'
import { FolhaPagamentoController } from './controllers/FolhaPagamentoController';
import { EmpresaController } from './controllers/EmpresaController';
import { UsuarioController } from './controllers/UsuarioController';
import { DepartamentoController } from './controllers/DepartamentoController';
import { CargoController } from './controllers/CargoController';
import { FuncionarioController } from './controllers/FuncionarioController';
import { BeneficiosController } from './controllers/BeneficiosController';
import { AdicionaisController } from './controllers/AdicionaisController';
import { HorasTrabalhadasController } from './controllers/HorasTrabalhadasController';
import { DescontosController } from './controllers/DescontosController';

const router = Router();

//get
router.get('/Empresa', new EmpresaController().Get);
//post
router.post('/Empresa', new EmpresaController().Post);

//get
router.get('/Usuario', new UsuarioController().Get);
//post
router.post('/Usuario', new UsuarioController().Post);
router.post('/Usuario/AutenticarUsuario', new UsuarioController().AutenticarUsuario);

//get
router.get('/Departamento', new DepartamentoController().Get);
//post
router.post('/Departamento', new DepartamentoController().Post);

//get
router.get('/Cargo', new CargoController().Get);
router.get('/Cargos', new CargoController().GetAll);
//post
router.post('/Cargo', new CargoController().Post);

//get
router.get('/Funcionario', new FuncionarioController().Get);
router.get('/Funcionarios', new FuncionarioController().GetAll);
//post
router.post('/Funcionario', new FuncionarioController().Post);
router.put('/Funcionario', new FuncionarioController().Put);
router.delete('/Funcionario', new FuncionarioController().Delete);

//get
router.get('/Beneficios', new BeneficiosController().Get);
//post
router.post('/Beneficios', new BeneficiosController().Post);

//get
router.get('/Adicionais', new AdicionaisController().Get);
//post
router.post('/Adicionais', new AdicionaisController().Post);

//get
router.get('/HorasTrabalhadas', new HorasTrabalhadasController().Get);
//post
router.post('/HorasTrabalhadas', new HorasTrabalhadasController().Post);

//get
router.get('/Descontos', new DescontosController().Get);
//post
router.post('/Descontos', new DescontosController().Post);

//get
router.get('/FolhaPagamento', new FolhaPagamentoController().Get);
router.get('/FolhaPagamento/GetByIDFuncionario', new FolhaPagamentoController().GetByIDFuncionario);
//post
router.post('/FolhaPagamento', new FolhaPagamentoController().Post);


export { router };