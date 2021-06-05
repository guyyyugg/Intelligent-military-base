'Showlogs strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      device_eui: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      position: {
        allowNull: true,
        type: Sequelize.STRING
      },
      latitude: {
        allowNull: true,
        type: Sequelize.STRING
      },
      longitude: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      rank: {
        allowNull: true,
        type: Sequelize.STRING
      },
      place: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      
      
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Devices');
  }
};


