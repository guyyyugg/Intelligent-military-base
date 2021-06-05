'Showlogs strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Places', {
     id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('Places');
  }
};