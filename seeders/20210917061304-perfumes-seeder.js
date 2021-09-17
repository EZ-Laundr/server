"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Perfumes",
			[
				{
					name: "Aqua Fresh",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/aquafresh_K3IdX9xAQdl.jpg?updatedAt=1631887736577",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Ocean Fresh",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/oceanFresh_BVi1ZnNui.jpeg?updatedAt=1631887740016",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Dunhill",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/dunhill_o3YiSsZ71.jpeg?updatedAt=1631887737850",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Lily Sweet",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/lilySweet_ZxcDRB3OgIb.jpeg?updatedAt=1631887738936",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Sakura",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/sakura_-puQwVMRQ.jpg?updatedAt=1631887741673",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Rose",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/rose_UrzSzp8Wm.jpeg?updatedAt=1631887740747",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Downy",
					price: 2000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/downy_245GU-iaT.jpeg?updatedAt=1631887737068",
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
