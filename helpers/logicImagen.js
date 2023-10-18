const multer = require('multer')
const configuracionMulter= {
    storage:fileStorage = multer.diskStorage({
        destination:(req,file, cb)=>{
            cb(null,__dirname+'../../candidatos')
        },
        filename:(req,file,cb)=>{
            const extension = file.mimetype.split('/')[1];
            cb(null,`${Date.now()}.${extension}`);
        }
    }),
    fileFilter(req,file,cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(new Error('Formato No Válido'))
        }
    }
}
const upload = multer(configuracionMulter).single('foto')

module.exports = {upload}