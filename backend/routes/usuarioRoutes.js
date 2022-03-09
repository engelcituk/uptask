import express from 'express'
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from '../controllers/usuarioController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

// Autenticación, Registro y confirmación de usuarios
router.post('/', registrar) // crea un nuevo usuario
router.post('/login', autenticar ) // autentica
router.get('/confirmar/:token', confirmar ) // confirmar cuenta
router.post('/olvide-password', olvidePassword ) // para solicitar un reseteo de password
//router.get('/olvide-password/:token', comprobarToken ) // recuperar cuenta, comprobar token
//router.post('/olvide-password/:token', nuevoPassword ) // recuperar cuenta
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

router.get('/perfil', checkAuth, perfil)
export default router