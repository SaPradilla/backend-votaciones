const bcrypt = require('bcrypt')
// Metodos de bcrypt
const Encrypt = {
    // Encrypta la contraseña
    cryptPassword: (password) =>
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => hash),

    // Compara la contraseña con hasheado con la ingresada
    comparePassword: (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
            .then(resp => resp)
}
module.exports = Encrypt
