import express from 'express'

import { agregarColaborador, editarProyecto, eliminarColaborador, eliminarProyecto, nuevoProyecto, obtenerProyecto, obtenerProyectos, obtenerTareas } from '../controllers/proyectoController.js'

import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

// Autenticación, Registro y confirmación de usuarios
router.
    route('/')
    .get(checkAuth, obtenerProyectos)
    .post(checkAuth, nuevoProyecto)

router.
    route('/:id')
    .get(checkAuth, obtenerProyecto)
    .put(checkAuth, editarProyecto)
    .delete(checkAuth, eliminarProyecto)

router.get('/tareas/:id', checkAuth, obtenerTareas)
router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)


export default router