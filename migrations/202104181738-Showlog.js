'Showlogs strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Showlogs', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rank: {
        allowNull: false,
        type: Sequelize.STRING
      },
      place: {
        allowNull: false,
        type: Sequelize.STRING
      },
      log: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Showlogs');
  }
};