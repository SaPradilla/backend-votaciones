const express = require('express')
const router = express.Router()
const {upload} = require('../helpers/logicImagen')

// controlador 
const Controller = require('../controllers/candidatoController')

router 
    //Registrar Candidato
    .post('/registrar',upload,Controller.subirArchivo,Controller.Create)
    // Listar todos los candidatos
    .get('/listar/:cargo',Controller.List)
    
    .put('/editar/:id',upload,Controller.subirArchivo,Controller.Update)


module.exports = router