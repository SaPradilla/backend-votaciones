const db = require('../models')
const Candidato = db.candidato
const LogicHelper = require('../helpers/logicImagen')

const subirArchivo = (req,res,next)=>{
    LogicHelper.upload(req,res,(error)=>{
        if(error){
            return res.json({msg:error})
        }
        return next()
    })
}

const Create = async(req,res)=>{
    const {nombre,apellido,biografia,cargo_postulante} = req.body
    try{
        console.log(req.file)
    
        const newCandidato = await Candidato.create({
            nombre,
            apellido,
            biografia,
            cargo_postulante,
            foto:req.file.filename
        })
        return res.status(200).json({
            msg:'Cantidado registrado correctamente.',
            Candidato: newCandidato
        })
    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al realizar el registro',
            errroName : error.name,
            error: error
        })
    }
}
const List = async(req,res)=>{
    try{
        const { cargo } = req.params
        const Candidatos = await Candidato.findAll({
            where:{
                cargo_postulante:cargo
            }
        })
        if(Candidato.length){
            return res.status(404).json({
                msg:'No hay candidatos'
            })
        }
        return res.json({
            msg:'Candidatos visualizados correctamente.',
            Candidatos: Candidatos
        })
    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al listar',
            errroName : error.name,
            error: error
        })
    }
}

module.exports = {Create,subirArchivo,List}