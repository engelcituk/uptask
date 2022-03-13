import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
 
const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    const [ proyectos, setProyectos ] = useState([])
    const [ alerta, setAlerta ] = useState({})

    const monstrarAlerta = alerta => {
        setAlerta(alerta)
        //despues de unos 5 segundos, desaparecer alerta
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProyecto = async proyecto => {
        console.log(proyecto)
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