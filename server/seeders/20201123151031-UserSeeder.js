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
      pin: bcrypt.hashSync("42069"),
      roleId: 1
    }, {
      email: "expert@m.com",
      firstName: "expert",
      lastName: "expert",
      about: "about expert",
      country: "country",
      password: bcrypt.hashSync("expert"),
      pin: bcrypt.hashSync("11111"),
      roleId: 2
    }, {
      email: "competitor@m.com",
      firstName: "comp",
      lastName: "comp",
      about: "about comp",
      country: "country",
      password: bcrypt.hashSync("competitor"),
      pin: bcrypt.hashSync("22222"),
      roleId: 3
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
