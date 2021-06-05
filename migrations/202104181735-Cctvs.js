'Cctvs strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cctvs', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ip_port: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      socket: {
        allowNull: true,
        type: Sequelize.STRING
      },
      latitude: {
        allowNull: false,
        type: Sequelize.STRING
      },
      longitude: {
        allowNull: false,
        type: Sequelize.STRING
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rank: {
        allowNull: false,
        type: Sequelize.STRING
      },
      place: {
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
    return queryInterface.dropTable('Cctvs');
  }
};