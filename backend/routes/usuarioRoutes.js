import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('hola mundo desde api/usuarios')
})

export default router