import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js'

const registrar = async (req, res) => {
    //evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email})

    if( existeUsuario ){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json( { msg: error.message } )
    }
    try {
        const usuario = new Usuario( req.body )
        usuario.token = generarId() //genero un id unico
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
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
}


export {
    registrar,
    autenticar
}