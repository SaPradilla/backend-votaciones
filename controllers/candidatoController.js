const db = require('../models')
const Candidato = db.candidato
const cloudinary = require('cloudinary').v2;

const subirArchivo = (req,res,next) => {
    console.log('Buffer de la imagen:', req.file.buffer);
    // Subir la imagen a Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          return next(new Error('Error al subir la imagen a Cloudinary'));
        }
    
        // Almacenar la URL de la imagen en req para que puedas usarla más adelante
        req.imageUrl = result.secure_url;
        next();
        
    }).end(req.file.buffer);
}

const Create = async(req,res)=>{
    const {nombre,apellido,biografia,cargo_postulante} = req.body
    try{
        const newCandidato = await Candidato.create({
            nombre,
            apellido,
            biografia,
            cargo_postulante,
            foto:req.imageUrl
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