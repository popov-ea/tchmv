'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Genders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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

    await queryInterface.addColumn("PostFounds", "genderId", { type: Sequelize.INTEGER });
    await queryInterface.addConstraint("PostFounds", {
      fields: ["genderId"],
      type: "foreign key",
      name: "postfs_gender_fk",
      references: {
        table: "Genders",
        field: "id"
      }
    });
    await queryInterface.addColumn("PostLosts", "genderId", { type: Sequelize.INTEGER });
    await queryInterface.addConstraint("PostLosts", {
      fields: ["genderId"],
      type: "foreign key",
      name: "postls_gender_fk",
      references: {
        table: "Genders",
        field: "id"
      }
    });
  },
  down: async (queryInterface, Sequelize) => {    
    await queryInterface.removeConstraint("PostLosts", "postls_gender_fk");
    await queryInterface.removeColumn("PostLosts", "genderId");
    await queryInterface.removeConstraint("PostFounds", "postfs_gender_fk");
    await queryInterface.removeColumn("PostFounds", "genderId");
    await queryInterface.dropTable('Genders');
  }
};