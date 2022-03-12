import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js'
import generarJWT from '../helpers/generarJWT.js'

const registrar = async (req, res) => {
    //evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email})

    if( existeUsuario ){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json( {ok: false, msg: error.message } )
    }
   
    try {
        const usuario = new Usuario( req.body )
        usuario.token = generarId() //genero un id unico
        await usuario.save()
        return res.json({ok: true, msg: 'Usuario creado correctamente, revisa tu email para confirmar tu cuenta'})
    } catch (error) {
        console.log( error )
    }
    
}

const autenticar = async (req, res) => {
    const { email, password } = req.body 
    //Comprobar que usuario existe
    const usuario = await Usuario.findOne({email})
    if( !usuario ){
        const error = new Error('Usuario no existe')
        return res.status(400).json( { msg: error.message } )
    }

    //Comprobar si el usuario está confirmado
    if( !usuario.confirmado ){
        const error = new Error('Tú cuenta no ha sido confirmada')
        return res.status(403).json( { msg: error.message } )
    }
    //Comprobar su password
    if( await usuario.comprobarPassword(password) ){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT( usuario._id )
        })
    } else {
        const error = new Error('La contraseña es incorrecta')
        return res.status(400).json( { msg: error.message } )
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Usuario.findOne({token})

    if( !usuarioConfirmar ){
        const error = new Error('El token no es válido')
        return res.status(404).json( { msg: error.message } )
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''
        await usuarioConfirmar.save()
        res.json( { msg:'Usuario confirmado correctamente'} )

    } catch (error) {
        console.log( error )
    }
}

const olvidePassword = async(req, res) => {
    const { email } = req.body 
    //Comprobar que usuario existe
    const usuario = await Usuario.findOne({email})
    if( !usuario ){
        const error = new Error('Usuario no existe')
        return res.status(404).json( { msg: error.message } )
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        res.json( { msg:'Hemos enviado un email con las instrucciones'} )
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async(req, res) => {
    const { token } = req.params 
    //Comprobar que usuario existe
    const usuario = await Usuario.findOne({token})

    if( usuario ){
        res.json( { msg:'Token válido y el usuario existe'} )
    } else {
        const error = new Error('Token no válido')
        return res.status(404).json( { msg: error.message } )
    }
}

const nuevoPassword = async(req, res) => {
    const { token } = req.params 
    const { password } = req.body 
    //Comprobar que usuario existe
    const usuario = await Usuario.findOne({token})

    if(usuario){
        usuario.password = password
        usuario.token = ''        
        try {
            await usuario.save()
            res.json( { msg:'La contraseña se ha cambiada'} )   
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Token no válido')
        return res.status(404).json( { msg: error.message } )
    }

}

const perfil = async(req, res) => {
    const { usuario } = req
    res.json( usuario )   
}


export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
}