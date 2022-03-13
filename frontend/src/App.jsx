import { BrowserRouter, Routes, Route  } from 'react-router-dom'
//Layouts
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
//public pages
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
//private pages
import Proyectos from './pages/Proyectos'

import { AuthProvider } from './context/AuthProvider'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>} />
            <Route path='registrar' element={<Registrar/>} />
            <Route path='olvide-password' element={<OlvidePassword/>} />
            <Route path='olvide-password/:token' element={<NuevoPassword/>} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta/>} />
          </Route>
          <Route path='/proyectos' element={<RutaProtegida/>}>
            <Route index element={<Proyectos/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
/**
 * empezando a instalar dependencias para el front
  npm create vite@latest
  npm install    

  Instalo axios y react-router-dom
  npm i axios react-router-dom

  instalo tailwind
  npm i -D tailwindcss postcss autoprefixer

  Para generar el archivo de configuracion de tailwind y de postcss
  npx tailwindcss innit -p    
 */