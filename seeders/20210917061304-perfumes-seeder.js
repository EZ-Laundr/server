"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Perfumes",
			[
				{
					name: "Aqua Fresh",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Ocean Fresh",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Dunhill",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Lily Sweet",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Sakura",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Rose",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Downy",
					price: 2000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Perfumes", null, {});
	},
};
