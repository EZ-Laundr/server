"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("OrderSpecials", "SpecialTreatmentId", {
			type: Sequelize.INTEGER,
			references: {
				model: "SpecialTreatments",
			},
			onUpdate: "cascade",
			onDelete: "cascade",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn(
			"OrderSpecials",
			"SpecialTreatmentId",
			{}
		);
	},
};
