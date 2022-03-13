import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
      <Link
            to='/proyectos'
            className="text-4xl text-sky-600 font-black"
          >UpTask</Link>
        <input
          tipe="search"
          placeholder="Buscar proyecto"
          className="rounded-lg lg:w-96 block p-2 border"
        />
        <div className='flex items-center gap-4'>
          <Link
            to='/proyectos'
            className='font-bold uppercase'
          >Proyectos</Link>
          <button
            type='button'
            className='text-white text-sm bg-sky-600 rounded-md p-3 uppercase font-bold'
          >Cerrar sesión</button>
        </div>
      </div>
    </header>
  )
}

export default Header