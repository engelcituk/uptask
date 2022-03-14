import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
 
const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [ proyectos, setProyectos ] = useState([])
    const [ alerta, setAlerta ] = useState({})
    const navigate = useNavigate()

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
    }, [])// se ejecuta una sola vez
    
    const monstrarAlerta = alerta => {
        setAlerta(alerta)
        //despues de unos 5 segundos, desaparecer alerta
        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }

    const submitProyecto = async proyecto => {

        const token = localStorage.getItem('token')
        
        if(!token) return

        const config = {
            headers:{
                'Conten-Type': 'application/json', 
                Authorization: `Bearer ${token}`
            }
        }

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

    return (
        <ProyectosContext.Provider
            value={{
                proyectos, //state
                alerta, //state
                monstrarAlerta, //funcion modificador del state alerta
                submitProyecto //funcion para guardar el proyecto al back
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