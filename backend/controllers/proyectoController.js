import Proyecto from '../models/Proyecto.js'
import Usuario from '../models/Usuario.js'


const obtenerProyectos = async (req, res) => {
    // criterio de busqueda para traer los proyectos de usuario creador o los proyectos donde es colaborador
    const proyectos = await Proyecto.find({
        $or:[
            { colaboradores: { $in: req.usuario } },
            { creador: { $in: req.usuario } },
        ],
    }) 
    .select('-tareas')

    return res.status(200).json({ok: true, proyectos })
}
const obtenerProyecto = async (req, res) => {
    const { id } = req.params
    
    if( id.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( { msg: error.message} )
    }
    //traigo le proyecto con sus tareas, colaboradores, de los colaboradores solo traer id, nombre, email
    const proyecto = await Proyecto.findById(id)
        .populate({path: 'tareas', populate:{ path:'completado', select:'nombre email'} })
        .populate('colaboradores','nombre email')

    if(!proyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json( {ok: false, msg: error.message } )
    }
    const noEsCreadorDelProyecto = proyecto.creador.toString() !== req.usuario._id.toString() 
    const noEsColaboradorDelProyecto = !proyecto.colaboradores.some( colaborador => colaborador._id.toString() === req.usuario._id.toString())
    //si es el creador o colaborador del proyecto,
    if( noEsCreadorDelProyecto && noEsColaboradorDelProyecto ){
        const error = new Error('No puedes ver este proyecto si no eres creador o colaborador')
        return res.status(401).json( { msg: error.message} )
    }
    //obtener las tareas del proyeccto
   // const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)

    return res.status(200).json( {ok: true, proyecto } )

}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    try {
        const proyectoAlmacenado = await proyecto.save()
        return res.status(201).json({ok:true, proyecto: proyectoAlmacenado })
    } catch (error) {
        console.log(error)
    }
}

const editarProyecto = async (req, res) => {
    
    const { id } = req.params
    const { nombre, cliente, descripcion,  fechaEntrega } = req.body
    
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
        const error = new Error('No puedes actualizar proyecto si no eres creador')
        return res.status(401).json( { msg: error.message} )
    }

    proyecto.nombre = nombre || proyecto.nombre 
    proyecto.cliente = cliente || proyecto.cliente 
    proyecto.descripcion = descripcion || proyecto.descripcion 
    proyecto.fechaEntrega = fechaEntrega || proyecto.fechaEntrega 

    try {
        const proyectoActualizado = await proyecto.save()
        return res.status(200).json( { ok:true, proyecto: proyectoActualizado } )
    } catch (error) {
        console.log(error)
    }
   
}

const eliminarProyecto = async (req, res) => {
    const { id } = req.params
    
    if( id.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( { msg: error.message} )
    }

    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json( {ok: false, msg: error.message } )
    }

    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('No puedes actualizar proyecto si no eres creador')
        return res.status(401).json( {ok: false, msg: error.message} )
    }

    try {
        await proyecto.deleteOne()
        return res.status(200).json( { ok: true, msg: 'Se ha borrado el proyecto'} )
    } catch (error) {
        console.log(error) 
    }
}

const buscarColaborador = async (req, res) => {
    const { email } = req.body

    const usuario = await Usuario.findOne({email}).select('-password -createdAt -confirmado -updatedAt -__v -token')


    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json( {ok: false, msg: error.message, usuario: null } )
    }

    if( usuario ){
        return res.status(200).json( { ok: true, msg: 'Usuario encontrado', usuario } )
    }

}

const agregarColaborador = async (req, res) => {

    const { id } = req.params
    const { email } = req.body

    if( id.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( {ok: false, msg: error.message} )
    }

    const proyecto = await Proyecto.findById(id)

    if(!proyecto){
        const error = new Error('El proyecto no se encontró')
        return res.status(404).json( {ok:false, msg: error.message } )
    }
    //sino es el creador del proyecto, aqui se termina
    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('Acción no válida')
        return res.status(401).json( {ok:false, msg: error.message} )
    }
    
    const usuario = await Usuario.findOne({email}).select('-password -createdAt -confirmado -updatedAt -__v -token')

    if(!usuario){
        const error = new Error('El usuario no existe')
        return res.status(404).json( {ok: false, msg: error.message, usuario: null } )
    }
    // el colaborador no es el admin del proyecto
    if( proyecto.creador.toString() === usuario._id.toString() ){
        const error = new Error('El creador del proyecto no puede ser colaborador')
        return res.status(401).json( {ok:false, msg: error.message} )
    }
    //Revisar que el colaborador no esté agregado al proyecto
    if(proyecto.colaboradores.includes(usuario._id)){
        const error = new Error('El colaborador ya pertenece proyecto')
        return res.status(401).json( {ok:false, msg: error.message} )
    }
    //si todo bien, se puede agregar
    proyecto.colaboradores.push(usuario._id)
    const proyectoActualizado = await proyecto.save()
    return res.status(200).json( { ok: true, msg: 'Colaborador agregado', proyecto: proyectoActualizado } )
}

const eliminarColaborador = async (req, res) => {

    const { id:idProyecto } = req.params
    const { id:idColaborador } = req.body

    if( idProyecto.length != 24 ){
        const error = new Error('el formato del id no es valido')
        return res.status(400).json( {ok: false, msg: error.message} )
    }

    const proyecto = await Proyecto.findById(idProyecto)

    if(!proyecto){
        const error = new Error('El proyecto no se encontró')
        return res.status(404).json( {ok:false, msg: error.message } )
    }
    //sino es el creador del proyecto, aqui se termina
    if( proyecto.creador.toString() !== req.usuario._id.toString() ){
        const error = new Error('Acción no válida')
        return res.status(401).json( {ok:false, msg: error.message} )
    }
     //si todo bien, se puede eliminar
     proyecto.colaboradores.pull(idColaborador)
     const proyectoActualizado = await proyecto.save()
     return res.status(200).json( { ok: true, msg: 'Colaborador borrado', proyecto: proyectoActualizado } )
    
}



export {
    agregarColaborador,
    buscarColaborador,
    editarProyecto,
    eliminarColaborador,
    eliminarProyecto,
    nuevoProyecto,
    obtenerProyecto,
    obtenerProyectos
}