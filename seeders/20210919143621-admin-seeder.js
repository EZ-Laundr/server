"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "admin@mail.com",
					password: hashPassword("admin"),
					phoneNumber: 123456789,
					role: "admin",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					email: "user@mail.com",
					password: hashPassword("user"),
					phoneNumber: 987654321,
					role: "customer",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
