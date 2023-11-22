'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('votantes', {
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
      tipo_documento: {
        type: Sequelize.ENUM('CC','TI')
      },
      documento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      numero_celular: {
        type: Sequelize.STRING,
        allowNull:false
      },
      correo: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      contrasena:{
        type: Sequelize.STRING,
        allowNull:false
      },
      isMenor:{
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('votantes');
  }
};