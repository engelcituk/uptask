import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
 
const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [ proyectos, setProyectos ] = useState([])
    const [ proyecto, setProyecto ] = useState({})
    const [ alerta, setAlerta ] = useState({})
    const [ cargando, setCargando ] = useState(false)
    const [ modalFormularioTarea, setModalFormularioTarea ] = useState(false)
    const [ tarea, setTarea ] = useState({})
    const [ modalEliminarTarea, setModalEliminarTarea ] = useState(false)
    const [ colaborador, setColaborador ] = useState({})
    const [ modalEliminarColaborador, setModalEliminarColaborador ] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        obtenerProyectos() // obtengo los proyectos
    }, [])
    //para obtener proyectos
    const obtenerProyectos = async () => {
        const token = localStorage.getItem('token')
    
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/proyectos`, config)
            setProyectos(data.proyectos) // pongo los proyectos en el state
        } catch (error) {
            console.log(error) 
        }
    }
    //para alerta success o error
    const monstrarAlerta = alerta => {
        setAlerta(alerta)
        //despues de unos 5 segundos, desaparecer alerta
        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }
    //para guardar un proyecto
    const submitProyecto = async proyecto => {

        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        if( proyecto.id ){
            await actualizarProyecto(proyecto, config)
        } else {
            await guardarProyecto(proyecto, config)
        }
    }

    const guardarProyecto = async (proyecto, config) => {
        try {
            const { data } = await clienteAxios.post(`/proyectos`, proyecto, config)
            setProyectos([...proyectos, {...data.proyecto } ]) // agrego al state proyectos el nuevo proyecto creado
            setAlerta({
                msg: 'El proyecto se creó correctamente ',
                error: false
            })
            //despues de  3 segundos lo mando al listado de proyectos
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)
            // setProyectos( data.usuario )
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarProyecto = async (proyecto, config) => {
        try {
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config )
            const proyectosActualizados = proyectos.map( proyecto => proyecto._id === data.proyecto._id ? data.proyecto : proyecto )
            setProyectos(proyectosActualizados) // agrego al state proyectos con el que ya está actualizado
            setAlerta({
                msg: 'El proyecto se actualizó correctamente',
                error: false
            })
            //despues de  3 segundos lo mando al listado de proyectos
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)
            // setProyectos( data.usuario )
        } catch (error) {
            console.log(error)
        }
    }
    //para la vista detalle de un proyecto
    const obtenerProyecto = async id => {
        setCargando(true)
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/proyectos/${id}`, config )
            setProyecto(data.proyecto) // pongo el proyecto en el state
            setAlerta({})

        } catch (error) {
            if(error.response){
                setAlerta({msg: error.response.data.msg, error: true })
                // setCuentaConfirmada(false)
            }
        } finally{
            setCargando(false)
        }
    }

    const submitTarea = async tarea => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }
        if(tarea?.id){
            await actualizarTarea(tarea, config)
        } else {
            await guardarTarea(tarea, config)
        }
    
        
    }

    const guardarTarea = async (tarea, config) => {
        try {
            const { data } = await clienteAxios.post(`/tareas`, tarea, config)
            setAlerta({
                msg: 'La tarea se creó correctamente ',
                error: false
            })
            //Agregar la tarea al state
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [...proyecto.tareas, data.tarea ]
            setProyecto(proyectoActualizado)
            //despues de  3 segundos reseteo alerta
            setTimeout(() => {
                setAlerta({})
                setModalFormularioTarea( false )
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarTarea = async (tarea, config) => {
        try {
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config )
            setAlerta({
                msg: 'La tarea se actualizó correctamente ',
                error: false
            })
            //Agregar la tarea al state
            const proyectoActualizado = { ...proyecto }
            const tareas = proyectoActualizado.tareas.map( tarea => tarea._id === data.tarea._id ? data.tarea : tarea )
            proyectoActualizado.tareas = [...tareas ]
            setProyecto(proyectoActualizado)
            //despues de  3 segundos reseteo alerta
            setTimeout(() => {
                setAlerta({})
                setModalFormularioTarea( false )
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarProyecto = async id => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
            //sincronizamos el state
            const proyectosActualizados = proyectos.filter( proyecto =>  proyecto._id !== id )
            setProyectos(proyectosActualizados) // agrego al state proyectos con el que ya está actualizado
            //mostramos el alerta del borrado
            setAlerta({ msg: data.msg, error: false })
            //despues de  3 segundos lo mando al listado de proyectos
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)
            // setProyectos( data.usuario )
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarTarea = async id => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`/tareas/${id}`, config)
            setAlerta({ msg: data.msg, error: false })
            //sincronizamos el state
            const proyectoActualizado = { ...proyecto }
            const tareas = proyectoActualizado.tareas.filter( tarea => tarea._id !== id)
            proyectoActualizado.tareas = [ ...tareas ]
            setProyecto(proyectoActualizado)
            setTarea({})
            setModalEliminarTarea( false )
            setTimeout(() => {
                setAlerta({})
            }, 3000)
            
        } catch (error) {
            console.log(error)
        }
    }
    const eliminarColaborador = async id => {
        console.log(id)
        return
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.delete(`/tareas/${id}`, config)
            setAlerta({ msg: data.msg, error: false })
            //sincronizamos el state
            const proyectoActualizado = { ...proyecto }
            const tareas = proyectoActualizado.tareas.filter( tarea => tarea._id !== id)
            proyectoActualizado.tareas = [ ...tareas ]
            setProyecto(proyectoActualizado)
            setTarea({})
            setModalEliminarTarea( false )
            setTimeout(() => {
                setAlerta({})
            }, 3000)
            
        } catch (error) {
            console.log(error)
        }
    }
    const submitColaborador = async email => {
        setCargando(true)
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/colaboradores`, {email}, config)
            setColaborador(data.usuario)
            setAlerta({})
        } catch (error) {
            if(error.response){
                setAlerta({msg: error.response.data.msg, error: true })
                setTimeout(() => {
                    setAlerta({})
                }, 3000)
                // setCuentaConfirmada(false)
            }
        }finally{
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, email, config)
            setAlerta({msg: data.msg, error: false })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000)

            
        } catch (error) {
            if(error.response){
                setAlerta({msg: error.response.data.msg, error: true })
                setColaborador({})
                setTimeout(() => {
                    setAlerta({})
                }, 3000)
                // setCuentaConfirmada(false)
            }
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea( !modalFormularioTarea )
        setTarea({})
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea( true )
    } 

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea( !modalEliminarTarea )
    }

    const handleModalEliminarColaborador = colaborador => {
        setColaborador(colaborador)
        setModalEliminarColaborador( !modalEliminarColaborador )
    }

    
    return (
        <ProyectosContext.Provider
            value={{
                alerta, //state
                cargando, // state
                colaborador, // state
                modalEliminarTarea,// state
                modalFormularioTarea, // state
                modalEliminarColaborador, // state
                proyecto, // state
                proyectos, //state
                tarea, //state
                agregarColaborador, // funcion para agregar colaborador
                eliminarColaborador, // función para eliminar colaborador desde el modal
                eliminarProyecto, //Funcion para eliminar un proyecto por el id
                eliminarTarea, // función para eliminar tarea desde el modal
                handleModalEliminarColaborador, // funcion para abrir modal de eliminacion de un colaborador
                handleModalEditarTarea, // función para actualizar la tarea
                handleModalEliminarTarea, // función para abrir modal de eliminación de una tarea
                handleModalTarea, // función para ocultar/mostrar modal crear/editar tareas
                monstrarAlerta, //funcion modificador del state alerta
                obtenerProyecto, // funcion para obtener los datos de un proyecto
                obtenerProyectos, // función para obtener proyectos
                submitColaborador, // funcion para añadir colaborador
                submitProyecto, //funcion para guardar el proyecto al back
                submitTarea, // funcion para guardar tarea
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider 
}

export default ProyectosContext