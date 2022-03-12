
const Login = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Inicia sesión y administra tus {' '}
        <span className="text-slate-700">proyectos</span>
      </h1>
      <form action="" className="my-10 bg-white shadow rounded-lg p-10">
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
          />
        </div>

        <div className="my-5">
          <label
            htmlFor="password" 
            className="uppercase text-gray-600 block text-xl font-bold"
          >Password</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
          />
        </div>

        <input
          type="sumit"
          value="Iniciar sesión"
          className="bg-sky-700 w-full py-3 mb-5 text-white uppercase font-bold rounded text-center hover:cursor-pointer hover:bg-sky-800 transition-colors"/>

      </form>
    </>
  )
}

export default Login