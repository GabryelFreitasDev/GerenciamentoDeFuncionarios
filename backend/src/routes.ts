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
//put
router.get('/Empresa', new EmpresaController().Put);
//delete
router.post('/Empresa', new EmpresaController().Delete);

//get
router.get('/Usuario', new UsuarioController().Get);
//post
router.post('/Usuario', new UsuarioController().Post);
router.post('/Usuario/AutenticarUsuario', new UsuarioController().AutenticarUsuario);
//put
router.get('/Usuario', new UsuarioController().Put);
//delete
router.post('/Usuario', new UsuarioController().Delete);

//get
router.get('/Departamento', new DepartamentoController().Get);
//post
router.post('/Departamento', new DepartamentoController().Post);
//put
router.get('/Departamento', new DepartamentoController().Put);
//delete
router.post('/Departamento', new DepartamentoController().Delete);

//get
router.get('/Cargo', new CargoController().Get);
router.get('/Cargos', new CargoController().GetAll);
//post
router.post('/Cargo', new CargoController().Post);
//put
router.put('/Cargos', new CargoController().Put)
//delete
router.delete('/Cargos', new CargoController().Delete)

//get
router.get('/Funcionario', new FuncionarioController().Get);
router.get('/Funcionarios', new FuncionarioController().GetAll);

//post
router.post('/Funcionario', new FuncionarioController().Post);
router.put('/Funcionario', new FuncionarioController().Put);
router.delete('/Funcionario', new FuncionarioController().Delete);
//put
router.put('/Funcionario', new FuncionarioController().Put)
//delete
router.delete('/Funcionario', new FuncionarioController().Delete)

//get
router.get('/Beneficios', new BeneficiosController().Get);
//post
router.post('/Beneficios', new BeneficiosController().Post);
//put
router.put('/Beneficios', new BeneficiosController().Put)
//delete
router.delete('/Beneficios', new BeneficiosController().Delete)

//get
router.get('/Adicionais', new AdicionaisController().Get);
//post
router.post('/Adicionais', new AdicionaisController().Post);
//put
router.put('/Adicionais', new AdicionaisController().Put)
//delete
router.delete('/Adicionais', new AdicionaisController().Delete)

//get
router.get('/HorasTrabalhadas', new HorasTrabalhadasController().Get);
//post
router.post('/HorasTrabalhadas', new HorasTrabalhadasController().Post);
//put
router.put('/HorasTrabalhadas', new HorasTrabalhadasController().Put)
//delete
router.delete('/HorasTrabalhadas', new HorasTrabalhadasController().Delete)

//get
router.get('/Descontos', new DescontosController().Get);
//post
router.post('/Descontos', new DescontosController().Post);
//put
router.put('/Descontos', new DescontosController().Put)
//delete
router.delete('/Descontos', new DescontosController().Delete)

//get
router.get('/FolhaPagamento', new FolhaPagamentoController().Get);
router.get('/FolhaPagamento/GetByIDFuncionario', new FolhaPagamentoController().GetByIDFuncionario);
//post
router.post('/FolhaPagamento', new FolhaPagamentoController().Post);
//put
router.put('/FolhaPagamento', new FolhaPagamentoController().Put)
//delete
router.delete('/FolhaPagamento', new FolhaPagamentoController().Delete)

export { router };