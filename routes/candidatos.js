const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/candidatoController')

router 
    .post('/registrar',Controller.subirArchivo,Controller.Create)
    .get('/listar/:cargo',Controller.List)

module.exports = router