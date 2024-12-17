import express from "express";
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/UsuarioController.js";
import { getAllColegios, getColegio, createColegio, updateColegio, deleteColegio } from "../controllers/ColegioController.js";
import { getAllCiclosEscolares, getCicloEscolar, createCicloEscolar, updateCicloEscolar, deleteCicloEscolar } from "../controllers/CicloEscolarController.js";
import { getAllNivelesEducacion, getNivelEducacion, createNivelEducacion, updateNivelEducacion, deleteNivelEducacion } from "../controllers/NivelEducacionController.js";
import { getAllJornadas, getJornada, createJornada, updateJornada, deleteJornada } from "../controllers/JornadaController.js";
import { 
    getAllJornadasCicloEscolar, 
    getJornadaCicloEscolar, 
    createJornadaCicloEscolar, 
    updateJornadaCicloEscolar, 
    deleteJornadaCicloEscolar 
} from "../controllers/JornadaCicloEscolarController.js";
import { 
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
const router = express.Router()

// usuarios
router.get('/usuarios/', getAllUsuarios)
router.get('/usuarios/:id', getUsuario)
router.post('/usuarios/', createUsuario)
router.put('/usuarios/:id', updateUsuario)
router.delete('/usuarios/:id', deleteUsuario)

// colegios
router.get('/colegios/', getAllColegios);
router.get('/colegios/:id', getColegio);
router.post('/colegios/', createColegio);
router.put('/colegios/:id', updateColegio);
router.delete('/colegios/:id', deleteColegio);

// ciclos escolares
router.get('/ciclosescolares/', getAllCiclosEscolares);
router.get('/ciclosescolares/:id', getCicloEscolar);
router.post('/ciclosescolares/', createCicloEscolar);
router.put('/ciclosescolares/:id', updateCicloEscolar);
router.delete('/ciclosescolares/:id', deleteCicloEscolar);

// niveles de educación
router.get('/niveleducacion/', getAllNivelesEducacion);
router.get('/niveleducacion/:id', getNivelEducacion);
router.post('/niveleducacion/', createNivelEducacion);
router.put('/niveleducacion/:id', updateNivelEducacion);
router.delete('/niveleducacion/:id', deleteNivelEducacion);

// jornadas
router.get('/jornadas/', getAllJornadas);
router.get('/jornadas/:id', getJornada);
router.post('/jornadas/', createJornada);
router.put('/jornadas/:id', updateJornada);
router.delete('/jornadas/:id', deleteJornada);

// jornadas ciclo escolar
router.get('/jornadacicloescolar/', getAllJornadasCicloEscolar);
router.get('/jornadacicloescolar/:id', getJornadaCicloEscolar);
router.post('/jornadacicloescolar/', createJornadaCicloEscolar);
router.put('/jornadacicloescolar/:id', updateJornadaCicloEscolar);
router.delete('/jornadacicloescolar/:id', deleteJornadaCicloEscolar);

// grados
router.get('/grados/', getAllGrados);
router.get('/grados/:id', getGrado);
router.post('/grados/', createGrado);
router.put('/grados/:id', updateGrado);
router.delete('/grados/:id', deleteGrado);

// personal docente
router.get('/personaldocente/', getAllPersonalDocente);
router.get('/personaldocente/:id', getPersonalDocente);
router.post('/personaldocente/', createPersonalDocente);
router.put('/personaldocente/:id', updatePersonalDocente);
router.delete('/personaldocente/:id', deletePersonalDocente);

// estudiantes
router.get('/estudiantes/', getAllEstudiantes);
router.get('/estudiantes/:id', getEstudiante);
router.post('/estudiantes/', createEstudiante);
router.put('/estudiantes/:id', updateEstudiante);
router.delete('/estudiantes/:id', deleteEstudiante);

export default router
