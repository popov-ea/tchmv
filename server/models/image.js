'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.PostFound, {
        through: "PostFound_Image"
      });
      this.belongsToMany(models.PostLost, {
        through: "PostLost_Image"
      });
    }
  };
  Image.init({
    path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};