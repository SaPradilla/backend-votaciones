const db = require('../models')
const Candidato = db.candidato
const cloudinary = require('cloudinary').v2;

const subirArchivo = (req,res,next) => {
    // console.log('Buffer de la imagen:', req.file.buffer);
    // Subir la imagen a Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'auto',folder:'votaciones' }, (error, result) => {
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
        const Candidatos = await Candidato.findAll({
            where:{
                cargo_postulante:cargo_postulante
            }
        })
        console.log(Candidatos.length)
        if(Candidatos.length === 6){
            return res.status(401).json({
                msg:'Ya no puedes registrar mas candidatos'
            })
        }
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

const Update = async(req,res)=>{
    const {id} = req.params
    try{
        let nuevoCandidato = req.body

        if(req.file){
            nuevoCandidato.foto =  req.imageUrl
            console.log('se ejecuto')

        }else{
            let findCandidato = await Candidato.findOne({
                where:id
            })
            if(findCandidato){
                return res.status(404).json({
                msg:'No se encontro el candidato'
                })
            }
            nuevoCandidato.foto = findCandidato.foto
        }

        const editCandidato = await Candidato.update({
            nuevoCandidato
        },{
            where:{
                id
            }
        })  
        return res.json({
            msg:'Candidatos actualizado correctamente.',
            Candidatos: editCandidato
        })
        
    }catch(error){
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
        console.log(Candidatos.length)
        if(Candidatos.length === 0){
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

const ListAll = async(req,res)=>{
    try{
        
        const Candidatos = await Candidato.findAll()
        console.log(Candidatos.length)

        if(Candidatos.length === 0){
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

module.exports = {Create,subirArchivo,List,Update,ListAll}