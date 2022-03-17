import { formatearFecha } from '../helpers/formatearFecha'
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {
    const { nombre, descripcion, fechaEntrega, prioridad, estado, _id } = colaborador
    const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos()
    
    return (
        <div className='border-b p-5 flex justify-between items-center'>
            <div>
                <p className='mb-1 text-xl'>{nombre}</p>
                <p className='mb-1 text-sm text-gray-500 uppercase'>{descripcion}</p>
                {/* <p className='mb-1 text-sm'>{formatearFecha(fechaEntrega) }</p> */}
                <p className='mb-1 text-gray-600'> Prioridad: {prioridad}</p>


            </div>
            <div className="flex gap-2">
                <button
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={ ()=> handleModalEditarTarea(colaborador) }
                >Editar</button>
               
                
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={ () => handleModalEliminarTarea(colaborador)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Colaborador