import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Server } from 'socket.io'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()

app.use( express.json() ) //para procesar información de tipo json

dotenv.config()

conectarDB()
//Configurar CORS
const whiteList = [ process.env.FRONTEND_URL ] //muy importante no dejar el / al final de la url
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

const servidor = app.listen( PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//socket.io configuración
const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL,
    },
})

io.on('connection', (socket) => {
    //Definir los eventos de socket.io
    socket.on('abrir proyecto', (proyecto) => { // el evento
        socket.join(proyecto) //lo uno a este cuarto
    })

    socket.on('agregar tarea', tarea => { // el evento
        const proyecto  = tarea.proyecto
        socket.to(proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => { // el evento
        const proyecto  = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', tarea => { // el evento
        const proyecto  = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea )
    })

    socket.on('cambiar estado', tarea => { // el evento
        const proyecto  = tarea.proyecto._id
        socket.to(proyecto).emit('estado cambiado', tarea )
    })
   
})