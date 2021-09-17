"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"SpecialTreatments",
			[
				{
					name: "Handuk",
					price: 5000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Sprei",
					price: 4000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Selimut",
					price: 7000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Gorden",
					price: 6000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Jas",
					price: 10000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Karpet",
					price: 20000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("SpecialTreatments", null, {});
	},
};
