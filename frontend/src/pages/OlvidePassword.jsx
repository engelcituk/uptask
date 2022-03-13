import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {
  const [ email, setEmail ] = useState('')
  const [ alerta, setAlerta ] = useState({})
  const { msg } = alerta

  const handleSubmit = async e => {
    e.preventDefault()
    if (email === '' || email.length < 0 ) {
      setAlerta({
        msg: 'El campo email es obligatorio',
        error: true
      })
      return
    }
  }
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Recupera tu {' '}
        <span className="text-slate-700">acceso</span>
      </h1>
      {
        msg &&  <Alerta alerta={alerta}/>
      }
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email" 
            className="uppercase text-gray-600 block text-xl font-bold"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
            value={email}
            onChange={ e => setEmail(e.target.value)}

          />
        </div>

        <input
          type="submit"
          defaultValue="Enviar instrucciones"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded text-center hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
      </form>

      <nav className="lg:flex lg:justify-between">

        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
        >¿Ya tienes una cuenta? Inicia sesión</Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/registrar"
        >¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword