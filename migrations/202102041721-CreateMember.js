'members strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
        type: DataTypes.STRING,
        allowNull: true,
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Members');
  }
};