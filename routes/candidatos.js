const express = require('express')
const router = express.Router()
const {upload} = require('../helpers/logicImagen')

// controlador 
const Controller = require('../controllers/candidatoController')

router 
    //Registrar Candidato
    // Listar todos los candidatos
    .get('/listar/:cargo',Controller.List)
    .get('/listar/',Controller.ListAll)
    
    .post('/registrar',upload,Controller.subirArchivo,Controller.Create)
    .put('/editar/:id',upload,Controller.subirArchivo,Controller.Update)
    
    .delete('/borrar/:id',Controller.Delete)


module.exports = router