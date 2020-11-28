'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("Users", "imageId", { type: Sequelize.INTEGER }, {
      after: "roleId"
    });
    queryInterface.addConstraint("Users", {
      fields: ["imageId"], 
      type: "foreign key",
      name: "user_image_id_fk",
      references: {
        table: "Images",
        field: "Id"
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeConstraint("Users", "user_image_id_fk");
    queryInterface.removeColumn("Users", "imageId");
  }
};
