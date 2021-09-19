"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "RoomId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Rooms",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "RoomId", {});
  },
};
