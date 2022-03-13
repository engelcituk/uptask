import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
 
const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            
            if(!token){
                return
            }
            const config = {
                headers:{
                    'Conten-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios(`/usuarios/perfil`, config)
                setAuth(data.usuario )
            } catch (error) {
                console.log(error)
            }
        }
        autenticarUsuario()
    }, [])// se ejecuta una sola vez, porque va comprobar si hay token
    
    return (
        <AuthContext.Provider
            value={{
                auth, // el state auth
                setAuth // paso el modificador para usarlo donde sea llamado
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider 
}

export default AuthContext