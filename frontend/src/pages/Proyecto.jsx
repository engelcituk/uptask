import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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
            <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>{nombre}</h1>
                <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <Link
                        to={`/proyectos/editar/${id}`}
                        className='uppercase font-bold'
                    >Editar</Link>
                </div>
            </div>

        )
    )
}

export default Proyecto