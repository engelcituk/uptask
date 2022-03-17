import express from 'express'

import { agregarColaborador, editarProyecto, eliminarColaborador, eliminarProyecto, nuevoProyecto, obtenerProyecto, obtenerProyectos, buscarColaborador } from '../controllers/proyectoController.js'

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

router.post('/colaboradores', checkAuth, buscarColaborador)
router.post('/colaboradores/:id', checkAuth, agregarColaborador)
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)


export default router
