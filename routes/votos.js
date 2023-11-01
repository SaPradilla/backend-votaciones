const express = require('express')
const router = express.Router()
// controlador 
const Controller = require('../controllers/votarController')

router 
    // Registrar voto candidato
    .post('/registrar/:seleccion/:candidatoId/:votanteId',Controller.Create)
    // Registrar voto en blanco
    .post('/registrar-blanco/:seleccion/:votanteId',Controller.CreateBlanco)
    // Listar los votos de una seleccion
    .get('/listar/:seleccion',Controller.Listar)
    // Ver votos id
    .get('/ver-votos/:id', Controller.VerVotosCandidato)

module.exports = router