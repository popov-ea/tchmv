'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userId"
      });
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
    }
  };
  Subscription.init({
    userId: DataTypes.INTEGER,
    cityId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    speciesId: DataTypes.INTEGER,
    breedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};