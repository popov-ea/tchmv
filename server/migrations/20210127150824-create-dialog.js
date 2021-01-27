'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dialogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postFoundId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PostFounds",
          key: "id"
        }
      },
      postLostId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PostLosts",
          key: "id"
        }
      },
      initiatorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Dialogs');
  }
};