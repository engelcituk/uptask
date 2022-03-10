import express from 'express'
import { actualizarTarea, agregarTarea, cambiarEstado, eliminarTarea, obtenerTarea } from '../controllers/tareaController.js'

import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

// Autenticación, Registro y confirmación de usuarios
router.post('/', checkAuth, agregarTarea)

router
    .route('/:id')
    .get(checkAuth, obtenerTarea)
    .put(checkAuth, actualizarTarea)
    .delete(checkAuth, eliminarTarea)

router.post('/estado/:id', checkAuth, cambiarEstado)

export default router