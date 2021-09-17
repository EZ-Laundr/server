"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Service extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Service.hasMany(models.Order);
		}
	}
	Service.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "name cannot be empty",
					},
					notNull: {
						msg: "name cannot be empty",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "price cannot be empty",
					},
					notNull: {
						msg: "price cannot be empty",
					},
				},
			},
			imageUrl: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "imageUrl cannot be empty",
					},
					notNull: {
						msg: "imageUrl cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Service",
		}
	);
	return Service;
};
