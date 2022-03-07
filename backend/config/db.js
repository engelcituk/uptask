import mongoose from 'mongoose'

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://mern_user:EtemU9Z7W456fRzj@cluster0.lqwvr.mongodb.net/test?authSource=admin&replicaSet=atlas-gzube4-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`mongoDB conectado en: ${url}`)

    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default conectarDB