import express from "express";
import { getAllUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from "../controllers/UsuarioController.js";
import { getAllColegios, getColegio, createColegio, updateColegio, deleteColegio } from "../controllers/ColegioController.js";
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

export default router
