/* jshint indent: 2 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Member = sequelize.define('Member', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  return Member;
}