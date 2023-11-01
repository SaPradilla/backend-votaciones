// Importar Multer
const multer = require('multer')

// Metodo para configurar la imaen
const configuracionMulter= {
    storage:fileStorage = multer.diskStorage({
        // Se asigna la ruta donde se almacena
        destination:(req,file, cb)=>{
            cb(null,__dirname+'../../candidatos')
        },
        // Se renombra 
        filename:(req,file,cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${Date.now()}.${extension}`);
        }
    }),
    // Detecta si la imagen tiene la extensio correcta
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(new Error('Formato No Válido'))
        }
    }
}
// Metodo para subir la imagen con la configuracion
const upload = multer(configuracionMulter).single('foto')

module.exports = {upload}