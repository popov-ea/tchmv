'use strict';
const bcrypt = require("bcryptjs");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [{
      email: "admin@m.com",
      firstName: "admin",
      lastName: "admin",
      about: "about admin",
      country: "country",
      password: bcrypt.hashSync("admin"),
      pin: 42069,
      roleId: 1
    }, {
      email: "aa@m.com",
      firstName: "aa",
      lastName: "aa",
      password: bcrypt.hashSync("expert"),
      roleId: 2
    }, {
      email: "bb@m.com",
      firstName: "bb",
      lastName: "bb",
      password: bcrypt.hashSync("competitor"),
      roleId: 2
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
