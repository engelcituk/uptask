import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Spinner from '../components/Spinner'

const RutaProtegida = () => {
  const { auth, cargando } = useAuth()
  if(cargando) return (<Spinner/>)
  return (
      <>
      {
        auth._id ? <Outlet/> : <Navigate to='/'/>
      }
        <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
          <div className='md:w-2/3 lg:w-2/5'>
            <Outlet/>
          </div>
        </main>
      </>
  )
}

export default RutaProtegida