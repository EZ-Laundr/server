"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"SpecialTreatments",
			[
				{
					name: "Handuk",
					price: 5000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/handuk_2nq91KBO_.jpeg?updatedAt=1631888212810",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Sprei",
					price: 4000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/sprei_NtgzfUTIm.jpg?updatedAt=1631888216541",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Selimut",
					price: 7000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/selimut_JZBGvMK96.webp?updatedAt=1631888215654",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Gorden",
					price: 6000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/gorden_xQew483tk-Z.webp?updatedAt=1631888212184",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Jas",
					price: 10000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/jas_xsHqE2xyF.webp?updatedAt=1631888213715",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Karpet",
					price: 20000,
					imageUrl:
						"https://ik.imagekit.io/ariefkoko/karpet_aOM1wKRUS.webp?updatedAt=1631888214665",
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
