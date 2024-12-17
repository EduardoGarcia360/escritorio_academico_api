import express from "express";
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/UsuarioController.js";
import { getAllColegios, getColegio, createColegio, updateColegio, deleteColegio } from "../controllers/ColegioController.js";
import { getAllCiclosEscolares, getCicloEscolar, createCicloEscolar, updateCicloEscolar, deleteCicloEscolar } from "../controllers/CicloEscolarController.js";
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

export default router
