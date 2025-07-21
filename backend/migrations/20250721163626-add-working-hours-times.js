'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('working_hours', 'startTime', {
      type: Sequelize.DATE,
      allowNull: false
    });

    await queryInterface.addColumn('working_hours', 'endTime', {
      type: Sequelize.DATE,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('working_hours', 'startTime');
    await queryInterface.removeColumn('working_hours', 'endTime');
  }
};
