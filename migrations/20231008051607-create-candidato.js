'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidatos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull:false
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull:false
      },
      foto: {
        type: Sequelize.STRING,
        allowNull:false
      },
      biografia: {
        type: Sequelize.STRING,
        allowNull:false
      },
      cargo_postulante:{
        type: Sequelize.ENUM('Alcalde','Gobernador','Junta Comunal','Asamblea','Representante SENA'),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('candidatos');
  }
};