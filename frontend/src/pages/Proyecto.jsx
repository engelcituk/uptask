import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Spinner from '../components/Spinner'

function Proyecto() {
    const params = useParams()
    const { obtenerProyecto, proyecto, cargando } = useProyectos() //uso del hook para trabajar con el ProyectosProvider
    const { id } = params
    const { nombre, } = proyecto
    // 
    useEffect(() => {
        obtenerProyecto(id) 
    }, [])
    

    return (
        cargando ? <Spinner/> : (
            <div>
                <h1 className='font-black text-4xl'>{nombre}</h1>
            </div>

        )
    )
}

export default Proyecto