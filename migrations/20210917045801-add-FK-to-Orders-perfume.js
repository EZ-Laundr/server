"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Orders", "PerfumeId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Perfumes",
			},
			onUpdate: "cascade",
			onDelete: "cascade",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Orders", "PerfumeId", {});
	},
};
