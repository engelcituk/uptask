import { Link } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Busqueda from '../components/Busqueda'

const Header = () => {
  const { buscador, handleModalBuscador } = useProyectos() //uso del hook para trabajar con el ProyectosProvider

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
      <Link
            to='/proyectos'
            className="text-4xl text-sky-600 font-black mb-5 md:mb-0"
          >UpTask</Link>
        
        <div className='flex flex-col md:flex-row items-center gap-4'>
          <button
            type='button'
            className='font-bold uppercase'
            onClick={handleModalBuscador}
          >
            Buscar Proyecto
          </button>
          <Link
            to='/proyectos'
            className='font-bold uppercase'
          >Proyectos</Link>
          <button
            type='button'
            className='text-white text-sm bg-sky-600 rounded-md p-3 uppercase font-bold'
          >Cerrar sesión</button>
          
          <Busqueda/>

        </div>
      </div>
    </header>
  )
}

export default Header