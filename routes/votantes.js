const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/votanteController')
router 
    .post('/registrar',Controller.Create)
    .post('/login',Controller.Login)
    .get('/validate-seleccion/:votanteId',Controller.SeleccionesVotadas)

module.exports = router