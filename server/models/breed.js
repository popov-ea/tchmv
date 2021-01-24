'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Breed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Species, {
        foreignKey: "speciesId"
      });
      this.hasMany(models.PostFound, {
        foreignKey: "breedId"
      });
      this.hasMany(models.PostLost, {
        foreignKey: "breedId"
      });
      this.hasMany(models.Subscription, {
        foreignKey: "breedId"
      });
    }
  };
  Breed.init({
    name: DataTypes.STRING,
    speciesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Breed',
  });
  return Breed;
};