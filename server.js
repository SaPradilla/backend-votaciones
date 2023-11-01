const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const Routes = require('./routes')
const Port = process.env.PORT
const cors = require('cors');

app.use(cors());
//Server
app.listen(Port, function(){
    console.log(`Conectado a localhost:${Port}`)
})
// Expres usara las ruta 
app.use('/candidatos', express.static('candidatos'))
// Para el manejo de obejecto y json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
// Ruta principal de la api
app.use('/api',Routes)


