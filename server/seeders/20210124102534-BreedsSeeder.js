'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const catBreeds = ["Шотландская вислоухая", "Британская вислоухая", "Бенгальская", "Сиамская"];
    const dogBreeds = ["Овчарка", "Алабай", "Английский бульдог", "Французский бульдог", "Хаски"];

    await queryInterface.bulkInsert("breeds", [
      ...catBreeds.map(x => ({name: x, speciesId: 2})),
      ...dogBreeds.map(x => ({name: x, speciesId: 1}))
    ]);
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
