'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostFounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id"
        }
      },
      districtId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Districts",
          key: "id"
        }
      },
      speciesId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Species",
          key: "id"
        }
      },
      breedId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Breeds",
          key: "id"
        }
      },
      userId: {
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
    await queryInterface.dropTable('PostFounds');
  }
};