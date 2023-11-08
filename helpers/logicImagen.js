require('dotenv').config()
// Importacion de cloudinary
const cloudinary = require('cloudinary').v2;
// Importar Multer
const multer = require('multer')

// Configuracion del cloundinary
cloudinary.config({
    cloud_name: 'dznrcsgts',
    api_key: '968959636762895',
    api_secret: process.env.API_KEY
});


// Metodo para configurar la imagen
// Almacenamiento en memoria, ya que Cloudinary lo necesita así
const fileStorage = multer.memoryStorage();

// Metodo para subir la imagen con la configuracion
const upload = multer({
    storage: fileStorage,
    // Detecta si la imagen tiene la extensión correcta
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No Válido'));
        }
    },
}).single('foto');

module.exports = { upload }