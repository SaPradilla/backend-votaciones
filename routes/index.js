const express = require('express')
const router = express.Router()
const VotanteRoute = require('./votantes')
const CandidatoRoute = require('./candidatos')
const VotosRoute = require('./votos')

const routersList = [
    {
        path:'/votante',  
        route:VotanteRoute
    },
    {
        path:'/candidato',  
        route:CandidatoRoute
    },
    {
        path:'/votos',  
        route:VotosRoute
    }
]
//En rutador
routersList.forEach((route) =>{
    router.use(route.path, route.route)
})
module.exports = router
