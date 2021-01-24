'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
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
      this.hasMany(models.PostFound, {
        foreignKey: "districtId"
      });
      this.hasMany(models.PostLost, {
        foreignKey: "districtId"
      });
      this.hasMany(models.Subscription, {
        foreignKey: "districtId"
      });
    }
  };
  District.init({
    name: DataTypes.STRING,
    cityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'District',
  });
  return District;
};