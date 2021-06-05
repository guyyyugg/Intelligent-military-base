/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    id: {
      type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      allowNull: false,
    },
    device_eui: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    latitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    longitude: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    rank: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    place: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  })
  return Device;
}