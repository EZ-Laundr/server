"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("OrderSpecials", "OrderId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Orders",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("OrderSpecials", "OrderId", {});
  },
};
