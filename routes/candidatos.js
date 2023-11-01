const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/candidatoController')

router 
    //Registrar Candidato
    .post('/registrar',Controller.subirArchivo,Controller.Create)
    // Listar todos los candidatos
    .get('/listar/:cargo',Controller.List)

module.exports = router