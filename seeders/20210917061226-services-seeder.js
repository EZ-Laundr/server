"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Services",
			[
				{
					name: "Cuci Lipat",
					price: 7000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Cuci Setrika",
					price: 10000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Setrika Aja",
					price: 3000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Services", null, {});
	},
};
