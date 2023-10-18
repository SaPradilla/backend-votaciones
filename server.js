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
app.use('/candidatos', express.static('candidatos'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/api',Routes)


