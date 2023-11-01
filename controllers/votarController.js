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
        // Crear el voto
        const nuevoVoto = Voto.create({
            candidatoId,
            votanteId
        })
        return res.status(200).json({
            msg:'Se ha registrado el voto',
            voto: nuevoVoto,
            // este dato se valida en el frontend y se almacena en un state
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
    // Require dos parametros, la seleccion y el votante
    const {seleccion,votanteId} = req.params
    try{
        // Ecuentra los votos en blanco por la seleccion y el votante
        const findVotoBlanco = await Blanco.findOne({
            where:{
                seleccion:seleccion,
                votanteId:votanteId
            }
        })
        // Si encuentra es porque ya voto en blanco
        if(findVotoBlanco){
            return res.json({
                msg:'Solo puedes votar por un cargo una vez.',
                yaVoto:true,
                seleccion:seleccion
            })
        }
        // Crea el voto en blanco
        const votoBlanco = Blanco.create({
            seleccion:seleccion,
            votanteId:votanteId
        })
        // Retorna el voto en blanco creado
        return res.status(200).json({
            msg:'Se ha registrado el voto en blanco',
            voto: votoBlanco,
            seleccion:seleccion,
            // este dato se valida en el frontend y se almacena en un state
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
    // Requiere el parametro seleccion
    const {seleccion} = req.params
    try{
        // Buscar todos los votos de una seleccion 
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
        // Busca todos los votos en blanco de una seleccion
        const VotosBlanco = await Blanco.findAll({
            where:{
                seleccion:seleccion
            }
        })
        // hace una copia de los objectos encontrador y los almacena en un arreglo
        const Votos = [...VotosCandidatos, ...VotosBlanco];
        // Retorna este arreglo en el json
        return res.json({
            msg:'Se ha listado los votos con exito',
            Votos: Votos
        })

    }catch(error){
        return res.status(500).json({
            msg:'Hubo un error al listar los votos',
            errroName : error.name,
            error: error
        })
    }
}

const VerVotosCandidato = async(req,res)=>{
    const { id } = req.params
    try{
        // Trae todos los votos de un candidato 
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
        // Retorna el json con los votos
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