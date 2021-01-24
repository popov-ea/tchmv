'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostLost_Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostLost_Image.init({
    imageId: DataTypes.INTEGER,
    postLostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostLost_Image',
  });
  return PostLost_Image;
};