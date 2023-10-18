const db = require('../models')
const Voto = db.votos
const Blanco = db.blancos

const Create = async(req,res)=>{
    const {seleccion,candidatoId,votanteId} = req.params
    try{
        // validar que ya voto por uno
        const finVotoCandidato = await Voto.findOne({
            include:{
                model:db.candidato,
                where:{
                    cargo_postulante:seleccion
                }
            },
            where:{
                votanteId: votanteId
            }
        })
        if(finVotoCandidato){
            return res.json({
                msg:'Solo puedes votar por un cargo una vez.',
                yaVoto:true,
                seleccion:seleccion

            })
        }
    
        const nuevoVoto = Voto.create({
            candidatoId,
            votanteId
        })
        return res.status(200).json({
            msg:'Se ha registrado el voto',
            voto: nuevoVoto,
            yaVoto:true,
            seleccion:seleccion
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al votar',
            errroName : error.name,
            error: error
        })
    }
}

const CreateBlanco = async(req,res)=>{
    try{
        const {seleccion,votanteId} = req.params
        const findVotoBlanco = await Blanco.findOne({
            where:{
                seleccion:seleccion,
                votanteId:votanteId
            }
        })
        if(findVotoBlanco){
            return res.json({
                msg:'Solo puedes votar por un cargo una vez.',
                yaVoto:true,
                seleccion:seleccion
            })
        }
        const votoBlanco = Blanco.create({
            seleccion:seleccion,
            votanteId:votanteId
        })

        return res.status(200).json({
            msg:'Se ha registrado el voto en blanco',
            voto: votoBlanco,
            seleccion:seleccion,
            yaVoto:true
        })
    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al votar',
            errroName : error.name,
            error: error
        })
    }
}

const Listar = async(req,res)=>{
    const {seleccion} = req.params
    // try{
        const VotosCandidatos = await Voto.findAll({
            include:[
                {
                    model:db.candidato,
                    where:{
                        cargo_postulante:seleccion
                    }
                },
                {
                    model:db.votante
                }
            ]
        })
        const VotosBlanco = await Blanco.findAll({
            where:{
                seleccion:seleccion
            }
        })
        const Votos = [...VotosCandidatos, ...VotosBlanco];
        return res.json({
            msg:'Se ha listado los votos con exito',
            Votos: Votos
        })

    // }catch(error){
    //     return res.status(500).json({
    //         msg:'Hubo un error al listar los votos',
    //         errroName : error.name,
    //         error: error
    //     })
    // }
}

const VerVotosCandidato = async(req,res)=>{
    const { id } = req.params
    try{
        // metodos para validar la existencia de los ids
        const Votos = await Voto.findOne({
            where:{
                candidatoId: id
            },
            include:[
                {
                    model:db.votante
                }
            ]
        })

        return res.json({
            msg:'Se ha visualizar el voto con exito',
            Votos: Votos
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al visualizar el voto',
            errroName : error.name,
            error: error
        })
    }
}


module.exports = {Create,CreateBlanco,VerVotosCandidato,Listar}