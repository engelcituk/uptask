import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body

    if( proyecto.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( { msg: error.message} )
    }

    const existeProyecto = await Proyecto.findById(proyecto)
    if(!existeProyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json( { msg: error.message } )
    }

    if( existeProyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('No puedes añadir tareas al proyecto si no eres creador')
        return res.status(401).json( { msg: error.message} )
    }

    try {
        const tareaAlmacenada = await Tarea.create( req.body )
        return res.status(200).json( tareaAlmacenada )
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) => {
    const { id } = req.params
    
    if( id.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( { msg: error.message} )
    }

    const tarea = await Tarea.findById(id).populate('proyecto')// traigo tambien el proyeccto asociado a este tarea

    if(!tarea){
        const error = new Error('La tarea no existe')
        return res.status(404).json( { msg: error.message } )
    }

    if( tarea.proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('No puedes ver esta tarea si no eres creador o colaborador')
        return res.status(403).json( { msg: error.message} )
    }

    return res.json(tarea)
}

const actualizarTarea = async (req, res) => {
    
    const { id } = req.params
    const { nombre, descripcion, prioridad, fechaEntrega } = req.body

    if( id.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( { msg: error.message} )
    }

    const tarea = await Tarea.findById(id).populate('proyecto')// traigo tambien el proyeccto asociado a este tarea

    if(!tarea){
        const error = new Error('La tarea no existe')
        return res.status(404).json( { msg: error.message } )
    }

    if( tarea.proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('No puedes ver esta tarea si no eres creador o colaborador')
        return res.status(403).json( { msg: error.message} )
    }

    tarea.nombre = nombre || tarea.nombre 
    tarea.descripcion = descripcion || tarea.descripcion 
    tarea.prioridad = prioridad || tarea.prioridad 
    tarea.fechaEntrega = fechaEntrega || tarea.fechaEntrega 

    try {
        const tareaActualizado = await tarea.save()
        return res.json(tareaActualizado)
    } catch (error) {
        console.log(error)
    }
    
}

const eliminarTarea = async (req, res) => {
    
}

const cambiarEstado = async (req, res) => {
  
}


const obtenerTareas = async (req, res) => {
  
}


export {
    actualizarTarea,
    agregarTarea,
    cambiarEstado,
    eliminarTarea,
    obtenerTarea,
}