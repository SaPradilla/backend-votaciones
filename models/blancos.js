'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blancos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blancos.belongsTo(models.votante,{
        foreignKey:'votanteId'
      })
    }
  }
  blancos.init({
    seleccion: DataTypes.STRING,
    votanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'blancos',
  });
  return blancos;
};