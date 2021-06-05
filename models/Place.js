/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Place = sequelize.define('Place', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });

  return Place;
};