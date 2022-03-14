import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Spinner from '../components/Spinner'
import FormularioProyecto from "../components/FormularioProyecto"


const EditarProyecto = () => {
    const params = useParams()
    const { obtenerProyecto, proyecto, cargando } = useProyectos() //uso del hook para trabajar con el ProyectosProvider
    const { id } = params
    const { nombre, } = proyecto
    // 
    useEffect(() => {
        obtenerProyecto(id) 
    }, [])

    if(cargando) return <Spinner/>

    return (
        <>
            <h1 className='font-black text-2xl'>Editar Proyecto: { nombre }</h1>
            <div className="mt-10 flex justify-center">
                <FormularioProyecto/>
            </div>
        </>
    )
}

export default EditarProyecto