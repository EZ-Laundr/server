"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("SpecialTreatments", "OrderId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Orders",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("SpecialTreatments", "OrderId", {});
  },
};
