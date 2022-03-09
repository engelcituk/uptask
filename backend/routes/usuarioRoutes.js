import express from 'express'
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken } from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y confirmación de usuarios
router.post('/', registrar) // crea un nuevo usuario
router.post('/login', autenticar ) // autentica
router.get('/confirmar/:token', confirmar ) // confirmar cuenta
router.post('/olvide-password', olvidePassword ) // para solicitar un reseteo de password
router.get('/olvide-password/:token', comprobarToken ) // recuperar cuenta

export default router