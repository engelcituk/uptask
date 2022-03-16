import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Spinner from '../components/Spinner'
import ModalFormularioTarea from '../components/ModalFormularioTarea'
import ModalEliminarTarea from '../components/ModalEliminarTarea'
import Alerta from '../components/Alerta'

import Tarea from '../components/Tarea'

function Proyecto() {
    const params = useParams()
    const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyectos() //uso del hook para trabajar con el ProyectosProvider
    const { id } = params
    const { nombre, _id } = proyecto
    const { msg } = alerta

    // 
    useEffect(() => {
        obtenerProyecto(id) 
    }, [])
    return (
        cargando ? <Spinner/> : (
            <>
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
                <button
                    onClick={ handleModalTarea }
                    type='button'
                    className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Nueva tarea
                </button>
                <p className='font-bold text-xl mt-10'>Tareas del proyecto</p>
                <div className='flex justify-center'>
                    <div className='w-full md:w-1/3 lg:w-1/4'>
                        {
                            msg &&  <Alerta alerta={alerta}/>
                        }
                    </div>
                </div>
                <div className='bg-white shadow mt-10 rounded'>
                    {
                        proyecto.tareas?.length ?
                        proyecto.tareas?.map( tarea => (
                            <Tarea
                                key={tarea._id}
                                tarea={tarea}
                            />
                        )) :
                        <p className='text-center my-5 p-10'>No hay tareas en este proyecto</p>
                    }
                </div>
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-xl mt-10'>Colaboradores</p>
                    <Link
                        to={`/proyectos/nuevo-colaborador/${_id}`}
                        className='text-gray-400 hover:text-black uppercase font-bold'
                    >
                    Añadir</Link>
                </div>

                <ModalFormularioTarea/>
                <ModalEliminarTarea/>
            </>
        )
    )
}

export default Proyecto