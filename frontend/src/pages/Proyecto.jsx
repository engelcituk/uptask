import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'

function Proyecto() {
    const params = useParams()
    const { obtenerProyecto, proyecto} = useProyectos() //uso del hook para trabajar con el ProyectosProvider
    const { id } = params

    // 
    useEffect(() => {
        obtenerProyecto(id) 
    }, [])
    

    return (
        <div>Proyecto</div>
    )
}

export default Proyecto