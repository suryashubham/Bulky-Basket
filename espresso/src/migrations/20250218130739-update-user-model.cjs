'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [8, 16]
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'password');
  }
};
