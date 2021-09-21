"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.hasMany(models.Order);
			User.hasOne(models.Room);
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: "email address already exist",
				},
				validate: {
					notEmpty: {
						msg: "email cannot be empty",
					},
					notNull: {
						msg: "email cannot be empty",
					},
					isEmail: {
						msg: "email must be in email format",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "password cannot be empty",
					},
					notNull: {
						msg: "password cannot be empty",
					},
				},
			},
			phoneNumber: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "phone number cannot be empty",
					},
					notNull: {
						msg: "phone number cannot be empty",
					},
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "role cannot be empty",
					},
					notNull: {
						msg: "role cannot be empty",
					},
				},
			},
			notificationToken: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeCreate((user, options) => {
		user.password = hashPassword(user.password);
	});

	return User;
};
