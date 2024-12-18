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
import { 
    getAllAsignacionesDocenteGrado, 
    getAsignacionDocenteGrado, 
    createAsignacionDocenteGrado, 
    updateAsignacionDocenteGrado, 
    deleteAsignacionDocenteGrado 
} from "../controllers/AsignacionDocenteGradoController.js";
import { 
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

// asignaciones docente-grado
router.get('/asignacionesdocentegrado/', getAllAsignacionesDocenteGrado);
router.get('/asignacionesdocentegrado/:id', getAsignacionDocenteGrado);
router.post('/asignacionesdocentegrado/', createAsignacionDocenteGrado);
router.put('/asignacionesdocentegrado/:id', updateAsignacionDocenteGrado);
router.delete('/asignacionesdocentegrado/:id', deleteAsignacionDocenteGrado);

// asignaciones estudiante-grado
router.get('/asignacionesestudiantegrado/', getAllAsignacionesEstudianteGrado);
router.get('/asignacionesestudiantegrado/:id', getAsignacionEstudianteGrado);
router.post('/asignacionesestudiantegrado/', createAsignacionEstudianteGrado);
router.put('/asignacionesestudiantegrado/:id', updateAsignacionEstudianteGrado);
router.delete('/asignacionesestudiantegrado/:id', deleteAsignacionEstudianteGrado);

// tutores
router.get('/tutores/', getAllTutores);
router.get('/tutores/:id', getTutor);
router.post('/tutores/', createTutor);
router.put('/tutores/:id', updateTutor);
router.delete('/tutores/:id', deleteTutor);

// relaciones tutor-estudiante
router.get('/tutorestudiantes/', getAllTutorEstudiantes);
router.get('/tutorestudiantes/:id', getTutorEstudiante);
router.post('/tutorestudiantes/', createTutorEstudiante);
router.put('/tutorestudiantes/:id', updateTutorEstudiante);
router.delete('/tutorestudiantes/:id', deleteTutorEstudiante);

// cuotas colegio
router.get('/cuotascolegio/', getAllCuotasColegio);
router.get('/cuotascolegio/:id', getCuotaColegio);
router.post('/cuotascolegio/', createCuotaColegio);
router.put('/cuotascolegio/:id', updateCuotaColegio);
router.delete('/cuotascolegio/:id', deleteCuotaColegio);

// cuotas estudiante
router.get('/cuotasestudiante/', getAllCuotasEstudiante);
router.get('/cuotasestudiante/:id', getCuotaEstudiante);
router.post('/cuotasestudiante/', createCuotaEstudiante);
router.put('/cuotasestudiante/:id', updateCuotaEstudiante);
router.delete('/cuotasestudiante/:id', deleteCuotaEstudiante);

export default router
