'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId"
      });
      User.belongsTo(models.Image, {
        foreignKey: "imageId"
      })
      this.hasMany(models.PostFound, {
        foreignKey: "userId"
      });
      this.hasMany(models.PostLost, {
        foreignKey: "userId"
      });
      this.hasMany(models.Subscription, {
        foreignKey: "userId"
      });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    about: DataTypes.STRING,
    pin: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};