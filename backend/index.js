const express = require("express")

const app = express()
console.log('eee')

app.listen(4000, ()=> {
    console.log('Servidor corriendo en el puerto 4000')
})