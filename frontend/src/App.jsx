import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import NuevoPassword from './pages/NuevoPassword'
import OlvidePassword from './pages/OlvidePassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login/>} />
          <Route path='registrar' element={<Registrar/>} />
          <Route path='olvide-password' element={<OlvidePassword/>} />
          <Route path='olvide-password/:token' element={<NuevoPassword/>} />
          <Route path='confirmar/:id' element={<ConfirmarCuenta/>} />
        </Route>
      </Routes>
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