'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'verified' ,'mob_verified');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Users', 'mob_verified', 'verified');
  }
};
