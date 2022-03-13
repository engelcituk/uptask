import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'

const NuevoPassword = () => {
  const [ alerta, setAlerta ] = useState({})
  const [ tokenValido, setTokenValido ] = useState(false)
  //parametros tomatos desde la url
  const params = useParams()
  const { token } = params
  const { msg } = alerta //del state alerta

  useEffect( () => {
    const comprobarToken = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`
        await axios(url)
        setTokenValido(true)
      } catch (error) {
        if(error.response){
          setAlerta({msg: error.response.data.msg, error: true })
        }
      }
     
    }
    comprobarToken()//ejecuto la función en el useEffect
  }, []) //vacío porque se requiere que se ejecute una sola vez
  
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reestablece tu password y accede a tus{' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      
      {
        tokenValido && (
          <form action="" className="my-10 bg-white shadow rounded-lg p-10">
            <div className="my-5">
              <label
                htmlFor="password" 
                className="uppercase text-gray-600 block text-xl font-bold"
              >Nuevo Password</label>
              <input
                id="password"
                type="password"
                placeholder="Escribe tu nueva contraseña"
                className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
              />
            </div>

            <input
              type="submit"
              defaultValue="Guardar nuevo password"
              className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded text-center hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
          </form>
        )
      }
      {
        msg &&  <Alerta alerta={alerta}/>

      }
    </>
  )
}

export default NuevoPassword