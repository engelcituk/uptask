import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FormularioColaborador from "../components/FormularioColaborador"
import useProyectos from '../hooks/useProyectos'
import Spinner from '../components/Spinner'

const NuevoColaborador = () => {
  const params = useParams()
  const { monstrarAlerta, alerta, obtenerProyecto, proyecto, cargando } = useProyectos()
  const { id } = params

  useEffect(() => {
    obtenerProyecto(id)
  }, [])
  
  return ( cargando ? <Spinner/> : (
    <>
        <h1 className='text-4xl font-black'>Añadir colaborador(a) al proyecto: { proyecto.nombre }</h1>
        <div className='mt-10 flex justify-center'>
            <FormularioColaborador/>
        </div>
    </>
  ))
}

export default NuevoColaborador