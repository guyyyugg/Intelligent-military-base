/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Showlog = sequelize.define('Showlog', {
    id: {
      type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    rank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    log: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  })
  return Showlog;
}