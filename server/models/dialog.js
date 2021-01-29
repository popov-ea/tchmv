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
      // this.belongsTo(models.PostFound, {
      //   foreignKey: "postFoundId"
      // });
      // this.belongsTo(models.PostLost, {
      //   foreignKey: "postLostId"
      // });
      this.hasMany(models.Message, {
        foreignKey: "dialogId"
      });
      this.belongsTo(models.PostLost, {
        foreignKey: "postLostId"
      });
      this.belongsTo(models.PostFound, {
        foreignKey: "postFoundId"
      });
    }
  };
  Dialog.init({
    postFoundId: DataTypes.INTEGER,
    initiatorId: DataTypes.INTEGER,
    postLostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dialog',
  });
  return Dialog;
};