'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1:M
      votos.belongsTo(models.candidato,{
        foreignKey:'candidatoId'
      })
      // 1:M
      votos.belongsTo(models.votante,{
        foreignKey:'votanteId'
      })
    }
  }
  votos.init({
    candidatoId: DataTypes.INTEGER,
    votanteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'votos',
  });
  return votos;
};