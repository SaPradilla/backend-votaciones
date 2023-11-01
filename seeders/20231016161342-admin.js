const Encrypt = require('../middleware/auth')
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Semilla del administrador
     await queryInterface.bulkInsert('votantes', [{
       nombre: 'adminUwu',
       apellido:'uww',
       tipo_documento:'CC',
       documento:'1087546958',
       numero_celular:'31232747',
       correo:'correo@correo.com',
       contrasena: await Encrypt.cryptPassword('sena123'),
       isMenor:false,
       createdAt: '2023-10-18 19:20:40',
       updatedAt:'2023-10-18 19:20:40'
       
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('votantes', null, {});
  }
};
