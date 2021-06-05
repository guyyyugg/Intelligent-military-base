/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pir = sequelize.define('Pir', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      
      allowNull: false,
      primaryKey: true
    },
    deviceID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Pir;
};