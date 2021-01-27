'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dialog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "initiatorId",
        as: "Initiator"
      });
    }
  };
  Dialog.init({
    postId: DataTypes.INTEGER,
    postFoundId: DataTypes.INTEGER,
    initiatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dialog',
  });
  return Dialog;
};