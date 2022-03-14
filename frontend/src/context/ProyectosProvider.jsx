import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
 
const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [ proyectos, setProyectos ] = useState([])
    const [ proyecto, setProyecto ] = useState({})
    const [ alerta, setAlerta ] = useState({})
    const [ cargando, setCargando ] = useState(false)
    const navigate = useNavigate()
    //use effect que funciona para la vista de listado de proyectos
    useEffect(() => {
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
        obtenerProyectos()
    }, [])// se ejecuta una sola vez, por eso está vacío
    
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
        } catch (error) {
            console.log(error) 
        } finally{
            setCargando(false)
        }
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos, //state
                alerta, //state
                proyecto, // state
                cargando, // state
                monstrarAlerta, //funcion modificador del state alerta
                submitProyecto, //funcion para guardar el proyecto al back
                obtenerProyecto, // funcion para obtener los datos de un proyecto
                eliminarProyecto, //Funcion para eliminar un proyecto por el id
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