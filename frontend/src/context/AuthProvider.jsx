import { useState, useEffect, createContext } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({})
    return (
        <AuthContext.Provider
            value={{
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