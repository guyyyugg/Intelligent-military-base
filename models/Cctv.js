/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cctv = sequelize.define('Cctv', {
    id: {
      type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    ip_port: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    socket: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    rank: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  })
  return Cctv;
}