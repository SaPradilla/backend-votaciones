const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/votanteController')
router 
    // Registrar
    .post('/registrar',Controller.Create)
    //Login
    .post('/login',Controller.Login)
    // Valida y trae que rutas ha votado el votante logueado
    .get('/validate-seleccion/:votanteId',Controller.SeleccionesVotadas)

module.exports = router