'members strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Members', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
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
      createdby: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phonenumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      simnumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      place: {
        allowNull: false,
        type: Sequelize.STRING
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Members');
  }
};