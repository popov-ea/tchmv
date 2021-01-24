'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostFound_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostFound_Image.init({
    imageId: DataTypes.INTEGER,
    postFoundId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostFound_Image',
  });
  return PostFound_Image;
};