'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: "cityId"
      });
      this.belongsTo(models.District, {
        foreignKey: "districtId"
      });
      this.belongsTo(models.Species, {
        foreignKey: "speciesId"
      });
      this.belongsTo(models.Breed, {
        foreignKey: "breedId"
      });
      this.belongsTo(models.User, {
        foreignKey: "userId"
      });
      this.belongsToMany(models.Image, {
        through: "PostLost_Image"
      });
      this.hasMany(models.Dialog, {
        foreignKey: "postLostId"
      });
    }
  };
  PostLost.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    speciesId: DataTypes.INTEGER,
    breedId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    closed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PostLost',
  });
  return PostLost;
};