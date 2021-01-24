'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const moscowDistricts = ["Центральный", "Северный", "Северо-Восточный", "Восточный", "Юго-Восточный", "Южный", "Юго-Западный", "Западный", "Северо-западный", "Зеленоградский", "Троицкий", "Новомосковский"];
    const spbDistricts = ["Адмиралтейский", "Василеостровский", "Выборгский", "Калининский", "Кировский", "Колпинский", "Красногвардейский", "Красносельский", "Кронштадтский", "Курортный", "Московский", "Невский", "	Петроградский", "Петродворцовый", "Приморский", "Пушкинский", "Фрунзенский", "Центральный"];
    const tmnDistricts = ["Восточный", "Калининский", "Лленинский", "Центральный"];

    await queryInterface.bulkInsert("districts", [
      ...moscowDistricts.map(x => ({ name: x, cityId: 1 })),
      ...spbDistricts.map(x => ({ name: x, cityId: 2 })),
      ...tmnDistricts.map(x => ({ name: x, cityId: 3 }))
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
