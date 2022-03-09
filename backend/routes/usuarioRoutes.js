import express from 'express'
import { registrar, autenticar, confirmar, olvidePassword } from '../controllers/usuarioController.js'

const router = express.Router()

// Autenticación, Registro y confirmación de usuarios
router.post('/', registrar) // crea un nuevo usuario
router.post('/login', autenticar ) // crea un nuevo usuario
router.get('/confirmar/:token', confirmar ) // crea un nuevo usuario
router.post('/olvide-password', olvidePassword ) // crea un nuevo usuario

export default router