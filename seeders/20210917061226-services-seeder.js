"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Services",
			[
				{
					name: "Cuci Lipat",
					price: 7000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/cucilipat_JecAiX-1O.jpg?updatedAt=1631886898298",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Cuci Setrika",
					price: 10000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/cucisetrika_T5Um00ntKi.png?updatedAt=1631886899097",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Setrika Aja",
					price: 3000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/setrikaaja_5B3y0bXxXp1.png?updatedAt=1631886899983",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Super Kilat",
					price: 20000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/superpanlaundry_qckNjqN7o.jpg?updatedAt=1632049154340",
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
