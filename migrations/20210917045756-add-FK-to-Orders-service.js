"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Orders", "ServiceId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Services",
			},
			onUpdate: "cascade",
			onDelete: "cascade",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Orders", "ServiceId", {});
	},
};
