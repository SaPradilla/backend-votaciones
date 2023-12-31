'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1:M
      votante.hasMany(models.votos,{
        foreignKey:'votanteId'
      })
      // 1:M
      votante.hasMany(models.blancos,{
        foreignKey:'votanteId'
      })
    }
  }
  votante.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    tipo_documento: DataTypes.ENUM('CC','TI','CE','PPT','PP'),
    documento: DataTypes.STRING,
    numero_celular: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena:DataTypes.STRING,
    isMenor:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'votante',
  });
  return votante;
};