import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()

app.use( express.json() ) //para procesar información de tipo json

dotenv.config()

conectarDB()
//Configurar CORS
const whiteList = [process.env.FRONTEND_URL] //muy importante no dejar el / al final de la url
const corsOptions = {
    origin: function (origin, callback) {
        if( whiteList.includes(origin) ){
            //puede consultar la api
            callback(null, true)
        } else{
            //reques no permitido
            callback(new Error('Error de cors'))
        }
    }
}

app.use( cors(corsOptions) )

//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

app.listen( PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})