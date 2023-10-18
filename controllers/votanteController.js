const db = require('../models')
const Votante = db.votante
const Encrypt = require('../middleware/auth')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Create = async (req, res) => {
    const { nombre, apellido, tipo_documento, documento, numero_celular, correo } = req.body
    try {
        const password_hash = await Encrypt.cryptPassword(req.body.contrasena)

        const newVotante = await Votante.create({
            nombre: nombre,
            apellido: apellido,
            tipo_documento: tipo_documento,
            documento: documento,
            numero_celular: numero_celular,
            correo: correo,
            contrasena: password_hash,
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
    const { documento, contrasena } = req.body
    try {
        
        const votanteLogin = await Votante.findOne(
            {
                where: {
                    documento: documento
                }
            })
        if(!votanteLogin){
            return res.status(404).json({
                msg:'No existe la cuenta del votante'
            })
        }
        
        const contrasena_comparada = await Encrypt.comparePassword(contrasena, votanteLogin.contrasena)

        if (!contrasena_comparada) { return res.status(500).json({msg:'Credenciales incorrectas'}) }
        
        const votante = { ...votanteLogin.dataValues }
        delete votante.contrasena
        
        const token = jwt.sign(
            { votante }, process.env.TOKEN_KEY, { expiresIn: "2h", }
        )
        
        console.log(votanteLogin.documento)
        return res.header('auth-token', token).json({
            msg:'Inicio de sesion exitoso.',
            data: {token},
            ide:votante.id,
            isMenor: votante.isMenor,
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
    const {votanteId} = req.params
    console.log(votanteId)
    const seleccionesVotadas = []
    try{
        const finVotoCandidato = await db.votos.findAll({
            where:{
                votanteId:votanteId
            },
            include:{
                model:db.candidato,
                attributes:['cargo_postulante']
            }
        })
        const findVotoBlanco = await db.blancos.findAll({
            where:{
                votanteId:votanteId
            },
            attributes:['seleccion']
        })

        finVotoCandidato.forEach(votoCandidato => {
            seleccionesVotadas.push(votoCandidato.candidato.cargo_postulante)
        })
        findVotoBlanco.forEach(votoBlanco =>{
            seleccionesVotadas.push(votoBlanco.seleccion)
        })

        return res.json({
            SeleccionesVotadas : seleccionesVotadas
        })
    }catch(error){
        console.log(error)
    }
}
module.exports = { Create ,Login,SeleccionesVotadas }