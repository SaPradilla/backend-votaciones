const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/votarController')

router 
    .post('/registrar/:seleccion/:candidatoId/:votanteId',Controller.Create)
    .post('/registrar-blanco/:seleccion/:votanteId',Controller.CreateBlanco)
    .get('/listar/:seleccion',Controller.Listar)
    .get('/ver-votos/:id', Controller.VerVotosCandidato)

module.exports = router