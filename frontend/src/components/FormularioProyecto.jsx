import { useState } from 'react'
import useProyectos from '../hooks/useProyectos'
import Alerta from '../components/Alerta'

const FormularioProyecto = () => {
    const [ nombre, setNombre ] = useState('')
    const [ descripcion, setDescripcion] = useState('')
    const [ fechaEntrega, setFechaEntrega ] = useState('')
    const [ cliente, setCliente ] = useState('')
    const { monstrarAlerta, alerta, submitProyecto } = useProyectos()
    const { msg } = alerta

    const handleSubmit = e => {
        e.preventDefault()

        if( [nombre, descripcion, fechaEntrega, cliente].includes('') ){
            monstrarAlerta({
              msg: 'Todos los campos son obligatorios',
              error: true
            })
            return
        }
        //Pasar los datos hacía el provider
        submitProyecto( { nombre, descripcion, fechaEntrega, cliente } )

    }
    return (   
        <form
            onSubmit={handleSubmit}
            className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        >
            {
                msg &&  <Alerta alerta={alerta}/>
            }
            <div className='mb-5'>
                <label
                    htmlFor="nombre"
                    className="text-gray-600 uppercase font-bold text-sm"
                >Nombre Proyecto</label>
                <input
                    id="nombre"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del proyecto"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="descripcion"
                    className="text-gray-600 uppercase font-bold text-sm"
                >Descripción Proyecto</label>
                <textarea
                    id="descripcion"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción del proyecto"
                    value={descripcion}
                    onChange={ e => setDescripcion(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="fecha-entrega"
                    className="text-gray-600 uppercase font-bold text-sm"
                >Fecha de entrega</label>
                <input
                    id="fecha-entrega"
                    type="date"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={ e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="nombre-cliente"
                    className="text-gray-600 uppercase font-bold text-sm"
                >Nombre cliente</label>
                <input
                    id="nombre-cliente"
                    type="text"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={ e => setCliente(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value="Crear proyecto"
                className="bg-sky-600 w-full p-3 mb-5 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors hover:cursor-pointer "
            />
        </form>
    )
}

export default FormularioProyecto