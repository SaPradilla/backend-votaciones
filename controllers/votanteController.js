const db = require('../models')
const Votante = db.votante
// Importaciones
const Encrypt = require('../middleware/auth')
const jwt = require('jsonwebtoken')
// Variables de entorno
require('dotenv').config()

const Create = async (req, res) => {
    // Require esto del formulario
    const { nombre, apellido, tipo_documento, documento, numero_celular, correo } = req.body
    try {
        // Encripta la contraseña
        const password_hash = await Encrypt.cryptPassword(req.body.contrasena)
        // Crear el votante
        const votanteFound = await Votante.findOne(
            {
                where: {
                    documento: documento
                }
            })
        if(votanteFound){
            return res.status(500).json({
                msg:'El documento ya esta registrado'
            })
        }

        const newVotante = await Votante.create({
            nombre: nombre,
            apellido: apellido,
            tipo_documento: tipo_documento,
            documento: documento,
            numero_celular: numero_celular,
            correo: correo,
            contrasena: password_hash,
            // Si el tipo de documento es ti es true, sino false
            isMenor:tipo_documento === 'TI' ? true : false
        })
        return res.status(200).json({
            msg: 'Votante regitrado correctamente',
            Votante: newVotante
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Hubo un error al realizar el registro',
            errroName: error.name,
            error: error
        })
    }
}

const Login = async (req, res) => {
    // Pide el documento y la contraseña
    const { documento, contrasena } = req.body
    try {
        // Encuentra el votante
        const votanteLogin = await Votante.findOne(
            {
                where: {
                    documento: documento
                }
            })
        // Sino lo encuentra es porque el documento ta malo
        if(!votanteLogin){
            return res.status(404).json({
                msg:'No existe la cuenta del votante'
            })
        }
        // Compara la contrasena y la compara 
        const contrasena_comparada = await Encrypt.comparePassword(contrasena, votanteLogin.contrasena)
        // Si el me todo retona false es porque no coincidio
        if (!contrasena_comparada) { return res.status(500).json({msg:'Credenciales incorrectas'}) }
        // Hace una copia del objecto encontrado y elimina la contrasena
        const votante = { ...votanteLogin.dataValues }
        delete votante.contrasena
        // Genera el token de autenticacion 
        const token = jwt.sign(
            { votante }, process.env.TOKEN_KEY, { expiresIn: "2h", }
        )
        // Envia en la cabezera el token y algunos datos  
        return res.header('auth-token', token).json({
            msg:'Inicio de sesion exitoso.',
            data: {token},
            ide:votante.id,
            isMenor: votante.isMenor,
            // Valida si el usuario ingresado es admintrado segun un admin designado en las .env
            permisosAdmin : votanteLogin.documento === process.env.ADMIN_USER ? true : false
        })

    } catch (error) {
        return res.json({
            msg:'Error al loguear',
            error
        })
    }
}
const SeleccionesVotadas = async(req,res)=>{
    // Require el id del votante de los parametros
    const {votanteId} = req.params
    const seleccionesVotadas = []
    try{
        // Busca todos los votos que ha hecho el candidato 
        // Consigo trae que selecciona ha votado
        const finVotoCandidato = await db.votos.findAll({
            where:{
                votanteId:votanteId
            },
            include:{
                model:db.candidato,
                attributes:['cargo_postulante']
            }
        })
        // Trae los votos en blanco 
        const findVotoBlanco = await db.blancos.findAll({
            where:{
                votanteId:votanteId
            },
            attributes:['seleccion']
        })
        // Intera los lista de los objectos  conseguidos y envia las selecciones votadas a el arreglo de seleccionesVotadas
        finVotoCandidato.forEach(votoCandidato => {
            seleccionesVotadas.push(votoCandidato.candidato.cargo_postulante)
        })
        findVotoBlanco.forEach(votoBlanco =>{
            seleccionesVotadas.push(votoBlanco.seleccion)
        })
        //  Retornas el arreglo
        return res.json({
            SeleccionesVotadas : seleccionesVotadas
        })
    }catch(error){
        console.log(error)
    }
}
module.exports = { Create ,Login,SeleccionesVotadas }