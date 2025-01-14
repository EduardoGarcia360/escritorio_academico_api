import express from "express";
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/UsuarioController.js";
import { getAllColegios, getColegio, createColegio, updateColegio, deleteColegio } from "../controllers/ColegioController.js";
import { getAllCiclosEscolares, getCicloEscolar, createCicloEscolar, updateCicloEscolar, deleteCicloEscolar } from "../controllers/CicloEscolarController.js";
import { getAllNivelesEducacion, getNivelEducacion, createNivelEducacion, updateNivelEducacion, deleteNivelEducacion } from "../controllers/NivelEducacionController.js";
import { 
    getJornadaByNivelEducacion,
    getAllJornadas, 
    getJornada, 
    createJornada, 
    updateJornada, 
    deleteJornada 
} from "../controllers/JornadaController.js";
import { 
    getAllJornadasCicloEscolar, 
    getJornadaCicloEscolar, 
    createJornadaCicloEscolar, 
    updateJornadaCicloEscolar, 
    deleteJornadaCicloEscolar 
} from "../controllers/JornadaCicloEscolarController.js";
import { 
    getAllGradosByJornadaCiclo,
    getAllGrados, 
    getGrado, 
    createGrado, 
    updateGrado, 
    deleteGrado 
} from "../controllers/GradoController.js";
import { 
    getAllPersonalDocente, 
    getPersonalDocente, 
    createPersonalDocente, 
    updatePersonalDocente, 
    deletePersonalDocente 
} from "../controllers/PersonalDocenteController.js";
import { 
    getAllEstudiantes, 
    getEstudiante, 
    createEstudiante, 
    updateEstudiante, 
    deleteEstudiante 
} from "../controllers/EstudianteController.js";
import { 
    getAllAsignacionesDocenteGrado, 
    getAsignacionDocenteGrado, 
    createAsignacionDocenteGrado, 
    updateAsignacionDocenteGrado, 
    deleteAsignacionDocenteGrado 
} from "../controllers/AsignacionDocenteGradoController.js";
import { 
    getAllAsignacionesEstudianteGradoByGrado,
    getAllAsignacionesEstudianteGrado, 
    getAsignacionEstudianteGrado, 
    createAsignacionEstudianteGrado, 
    updateAsignacionEstudianteGrado, 
    deleteAsignacionEstudianteGrado 
} from "../controllers/AsignacionEstudianteGradoController.js";
import { 
    getAllTutores, 
    getTutor, 
    createTutor, 
    updateTutor, 
    deleteTutor 
} from "../controllers/TutorController.js";
import { 
    getAllTutorEstudiantes, 
    getTutorEstudiante, 
    createTutorEstudiante, 
    updateTutorEstudiante, 
    deleteTutorEstudiante 
} from "../controllers/TutorEstudianteController.js";
import { 
    getAllCuotasColegio, 
    getCuotaColegio, 
    createCuotaColegio, 
    updateCuotaColegio, 
    deleteCuotaColegio 
} from "../controllers/CuotaColegioController.js";
import { 
    getAllCuotasEstudiante, 
    getCuotaEstudiante, 
    createCuotaEstudiante, 
    updateCuotaEstudiante, 
    deleteCuotaEstudiante 
} from "../controllers/CuotaEstudianteController.js";
import { 
    getPagoCuotaByCuotaEstudiante,
    getAllPagosCuota, 
    getPagoCuota, 
    createPagoCuota, 
    updatePagoCuota, 
    deletePagoCuota 
} from "../controllers/PagoCuotaController.js";
import { 
    getAllGastosExtraordinarios, 
    getGastoExtraordinario, 
    createGastoExtraordinario, 
    updateGastoExtraordinario, 
    deleteGastoExtraordinario 
} from "../controllers/GastoExtraordinarioController.js";
import { 
    getAllDetallesGastoTutor, 
    getDetalleGastoTutor, 
    createDetalleGastoTutor, 
    updateDetalleGastoTutor, 
    deleteDetalleGastoTutor 
} from "../controllers/DetalleGastoTutorController.js";
import { 
    getAllActividadesBus, 
    getActividadBus, 
    createActividadBus, 
    updateActividadBus, 
    deleteActividadBus 
} from "../controllers/ActividadBusController.js";
import { 
    getAllBuses, 
    getBus, 
    createBus, 
    updateBus, 
    deleteBus 
} from "../controllers/BusController.js";
import { 
    getAllEncargadosBus, 
    getEncargadoBus, 
    createEncargadoBus, 
    updateEncargadoBus, 
    deleteEncargadoBus 
} from "../controllers/EncargadoBusController.js";
import { 
    getAllEstudiantesActividades, 
    getEstudianteActividad, 
    createEstudianteActividad, 
    updateEstudianteActividad, 
    deleteEstudianteActividad 
} from "../controllers/EstudianteActividadController.js";
import { 
    getAllCoordenadasBus, 
    getCoordenadaBus, 
    createCoordenadaBus, 
    updateCoordenadaBus, 
    deleteCoordenadaBus 
} from "../controllers/CoordenadaBusController.js";
import { executeStoredProcedure } from "../controllers/StoredProcedureController.js";
import { 
    getUsuariosByColegio, 
    getUsuarioColegio, 
    createUsuarioColegio, 
    deleteUsuarioColegio 
} from "../controllers/UsuarioColegioController.js";
import {
    getAllBancos,
    getBanco,
    createBanco,
    updateBanco,
    deleteBanco
} from "../controllers/BancoController.js";
import {
    getAllCuentasBancariasColegio,
    getCuentaBancariaColegio,
    createCuentaBancariaColegio,
    updateCuentaBancariaColegio,
    deleteCuentaBancariaColegio
} from "../controllers/CuentaBancariaColegioController.js";
import { getAllSecciones } from "../controllers/SeccionController.js";
import { login, validateSession } from "../controllers/AuthController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { decryptPayload } from "../middlewares/securityMiddleware.js";
const router = express.Router()

// usuarios
router.get('/usuarios/:id', authenticateToken, getUsuario)
router.post('/usuarios/', decryptPayload, authenticateToken, createUsuario)
router.put('/usuarios/:id', decryptPayload, authenticateToken, updateUsuario)

// colegios
router.get('/colegios/', authenticateToken, getColegio);
router.post('/colegios/', decryptPayload, authenticateToken, createColegio);
router.put('/colegios/', decryptPayload, authenticateToken, updateColegio);
router.delete('/colegios/:id', decryptPayload, authenticateToken, deleteColegio);

// ciclos escolares
router.get('/ciclosescolares/', decryptPayload, authenticateToken, getAllCiclosEscolares);
router.get('/ciclosescolares/:id', decryptPayload, authenticateToken, getCicloEscolar);
router.post('/ciclosescolares/', decryptPayload, authenticateToken, createCicloEscolar);
router.put('/ciclosescolares/:id', decryptPayload, authenticateToken, updateCicloEscolar);
router.delete('/ciclosescolares/:id', decryptPayload, authenticateToken, deleteCicloEscolar);

// niveles de educación
router.get('/niveleducacion/', decryptPayload, authenticateToken, getAllNivelesEducacion);
router.get('/niveleducacion/:id', decryptPayload, authenticateToken, getNivelEducacion);
router.post('/niveleducacion/', decryptPayload, authenticateToken, createNivelEducacion);
router.put('/niveleducacion/:id', decryptPayload, authenticateToken, updateNivelEducacion);
router.delete('/niveleducacion/:id', decryptPayload, authenticateToken, deleteNivelEducacion);

// jornadas
router.get('/jornadas/:id', decryptPayload, authenticateToken, getJornada);
router.get('/jornadas/niveleducacion/:id', decryptPayload, authenticateToken, getJornadaByNivelEducacion);
router.post('/jornadas/', decryptPayload, authenticateToken, createJornada);
router.put('/jornadas/:id', decryptPayload, authenticateToken, updateJornada);
router.delete('/jornadas/:id', decryptPayload, authenticateToken, deleteJornada);

// jornadas ciclo escolar
router.post('/jornadacicloescolar/', decryptPayload, authenticateToken, createJornadaCicloEscolar);
router.delete('/jornadacicloescolar/:id', decryptPayload, authenticateToken, deleteJornadaCicloEscolar);

// grados
router.get('/grados/jornadaciclo/:id', decryptPayload, authenticateToken, getAllGradosByJornadaCiclo);
router.get('/grados/:id', decryptPayload, authenticateToken, getGrado);
router.post('/grados/', decryptPayload, authenticateToken, createGrado);
router.put('/grados/:id', decryptPayload, authenticateToken, updateGrado);
router.delete('/grados/:id', decryptPayload, authenticateToken, deleteGrado);

// personal docente
router.get('/personaldocente/', decryptPayload, authenticateToken, getAllPersonalDocente);
router.get('/personaldocente/:id', decryptPayload, authenticateToken, getPersonalDocente);
router.post('/personaldocente/', decryptPayload, authenticateToken, createPersonalDocente);
router.put('/personaldocente/:id', decryptPayload, authenticateToken, updatePersonalDocente);
router.delete('/personaldocente/:id', decryptPayload, authenticateToken, deletePersonalDocente);

// estudiantes
router.get('/estudiantes/:id', decryptPayload, authenticateToken, getEstudiante);
router.post('/estudiantes/', decryptPayload, authenticateToken, createEstudiante);
router.put('/estudiantes/:id', decryptPayload, authenticateToken, updateEstudiante);
router.put('/estudiantes/inactivar/:id', decryptPayload, authenticateToken, updateEstudiante);

// asignaciones docente-grado
router.post('/asignacionesdocentegrado/', decryptPayload, authenticateToken, createAsignacionDocenteGrado);
router.delete('/asignacionesdocentegrado/:id', decryptPayload, authenticateToken, deleteAsignacionDocenteGrado);

// asignaciones estudiante-grado
router.get('/asignacionesestudiantegrado/grado/:id', decryptPayload, authenticateToken, getAllAsignacionesEstudianteGradoByGrado);
router.post('/asignacionesestudiantegrado/', decryptPayload, authenticateToken, createAsignacionEstudianteGrado);
router.delete('/asignacionesestudiantegrado/:id', decryptPayload, authenticateToken, deleteAsignacionEstudianteGrado);

// tutores
router.get('/tutores/estudiante/:id', decryptPayload, authenticateToken, getAllTutores);
router.get('/tutores/:id', decryptPayload, authenticateToken, getTutor);
router.post('/tutores/', decryptPayload, authenticateToken, createTutor);
router.put('/tutores/:id', decryptPayload, authenticateToken, updateTutor);
router.delete('/tutores/:id', decryptPayload, authenticateToken, deleteTutor);

// relaciones tutor-estudiante

// cuotas colegio
router.get('/cuotascolegio/', decryptPayload, authenticateToken, getAllCuotasColegio);
router.get('/cuotascolegio/:id', decryptPayload, authenticateToken, getCuotaColegio);
router.post('/cuotascolegio/', decryptPayload, authenticateToken, createCuotaColegio);
router.put('/cuotascolegio/:id', decryptPayload, authenticateToken, updateCuotaColegio);
router.delete('/cuotascolegio/:id', decryptPayload, authenticateToken, deleteCuotaColegio);

// cuotas estudiante
router.get('/cuotasestudiante/:id', decryptPayload, authenticateToken, getAllCuotasEstudiante);
router.get('/cuotasestudiante/resumen/:id', decryptPayload, authenticateToken, getCuotaEstudiante);
router.put('/cuotasestudiante/:id', decryptPayload, authenticateToken, updateCuotaEstudiante);

// pagos de cuota
router.get('/pagoscuota/', decryptPayload, authenticateToken, getAllPagosCuota);
router.get('/pagoscuota/cuotaestudiante/:id', decryptPayload, authenticateToken, getPagoCuotaByCuotaEstudiante);
router.post('/pagoscuota/', decryptPayload, authenticateToken, createPagoCuota);

// gastos extraordinarios
router.get('/gastosextraordinarios/', decryptPayload, authenticateToken, getAllGastosExtraordinarios);
router.get('/gastosextraordinarios/:id', decryptPayload, authenticateToken, getGastoExtraordinario);
router.post('/gastosextraordinarios/', decryptPayload, authenticateToken, createGastoExtraordinario);
router.put('/gastosextraordinarios/:id', decryptPayload, authenticateToken, updateGastoExtraordinario);
router.delete('/gastosextraordinarios/:id', decryptPayload, authenticateToken, deleteGastoExtraordinario);

// detalles de gastos de tutor
router.get('/detallesgastotutor/', getAllDetallesGastoTutor);
router.get('/detallesgastotutor/:id', getDetalleGastoTutor);
router.post('/detallesgastotutor/', createDetalleGastoTutor);
router.put('/detallesgastotutor/:id', updateDetalleGastoTutor);
router.delete('/detallesgastotutor/:id', deleteDetalleGastoTutor);

// actividades de bus
router.get('/actividadesbus/', getAllActividadesBus);
router.get('/actividadesbus/:id', getActividadBus);
router.post('/actividadesbus/', createActividadBus);
router.put('/actividadesbus/:id', updateActividadBus);
router.delete('/actividadesbus/:id', deleteActividadBus);

// buses
router.get('/buses/', getAllBuses);
router.get('/buses/:id', getBus);
router.post('/buses/', createBus);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);

// encargados de bus
router.get('/encargadosbus/', getAllEncargadosBus);
router.get('/encargadosbus/:id', getEncargadoBus);
router.post('/encargadosbus/', createEncargadoBus);
router.put('/encargadosbus/:id', updateEncargadoBus);
router.delete('/encargadosbus/:id', deleteEncargadoBus);

// actividades de estudiantes
router.get('/estudiantesactividades/', getAllEstudiantesActividades);
router.get('/estudiantesactividades/:id', getEstudianteActividad);
router.post('/estudiantesactividades/', createEstudianteActividad);
router.put('/estudiantesactividades/:id', updateEstudianteActividad);
router.delete('/estudiantesactividades/:id', deleteEstudianteActividad);

// coordenadas de buses
router.get('/coordenadasbus/', getAllCoordenadasBus);
router.get('/coordenadasbus/:id', getCoordenadaBus);
router.post('/coordenadasbus/', createCoordenadaBus);
router.put('/coordenadasbus/:id', updateCoordenadaBus);
router.delete('/coordenadasbus/:id', deleteCoordenadaBus);

// relaciones usuario-colegio
router.get('/usuarioscolegios/colegio/:id', getUsuariosByColegio);
router.get('/usuarioscolegios/:id', getUsuarioColegio);
router.post('/usuarioscolegios/', createUsuarioColegio);
router.delete('/usuarioscolegios/:id', deleteUsuarioColegio);

// bancos
router.get('/bancos/', decryptPayload, authenticateToken, getAllBancos);
router.get('/bancos/:id', decryptPayload, authenticateToken, getBanco);
router.post('/bancos/', decryptPayload, authenticateToken, createBanco);
router.put('/bancos/:id', decryptPayload, authenticateToken, updateBanco);
router.delete('/bancos/:id', decryptPayload, authenticateToken, deleteBanco);

// Cuentas bancarias de colegio
router.get('/cuentasbancarias/', decryptPayload, authenticateToken, getAllCuentasBancariasColegio);
router.get('/cuentasbancarias/:id', decryptPayload, authenticateToken, getCuentaBancariaColegio);
router.post('/cuentasbancarias/', decryptPayload, authenticateToken, createCuentaBancariaColegio);
router.put('/cuentasbancarias/:id', decryptPayload, authenticateToken, updateCuentaBancariaColegio);
router.delete('/cuentasbancarias/:id', decryptPayload, authenticateToken, deleteCuentaBancariaColegio);

// secciones
router.get('/secciones', decryptPayload, authenticateToken, getAllSecciones);

// ejecutar stored procedure
router.post('/execute-procedure', executeStoredProcedure);

// autenticación
router.post('/login', decryptPayload, login)
router.get('/auth/validatesession', decryptPayload, authenticateToken, validateSession)

export default router
