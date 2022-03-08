import express from 'express'
import { registrar } from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y confirmación de usuarios
router.post('/', registrar) // crea un nuevo usuario


export default router