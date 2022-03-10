import Proyecto from '../models/Proyecto.js'

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params
    
    if( id.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( { msg: error.message} )
    }

    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json( { msg: error.message } )
    }

    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('No puedes ver este proyecto si no eres creador o colaborador')
        return res.status(401).json( { msg: error.message} )
    }

    return res.json(proyecto)
}

const editarProyecto = async (req, res) => {
  
}

const eliminarProyecto = async (req, res) => {
  
}


const agregarColaborador = async (req, res) => {
  
}

const eliminarColaborador = async (req, res) => {
  
}

const obtenerTareas = async (req, res) => {
  
}


export {
    agregarColaborador,
    editarProyecto,
    eliminarColaborador,
    eliminarProyecto,
    nuevoProyecto,
    obtenerProyecto,
    obtenerProyectos,
    obtenerTareas
}