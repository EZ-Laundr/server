"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Orders", "UserId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Users",
			},
			onUpdate: "cascade",
			onDelete: "cascade",
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Orders", "UserId", {});
	},
};
