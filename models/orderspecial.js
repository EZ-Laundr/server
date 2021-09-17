"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrderSpecial extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			OrderSpecial.belongsTo(models.SpecialTreatment);
			OrderSpecial.belongsTo(models.Order);
		}
	}
	OrderSpecial.init(
		{
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "quantity cannot be empty",
					},
					notNull: {
						msg: "quantity cannot be empty",
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
		},
		{
			sequelize,
			modelName: "OrderSpecial",
		}
	);
	return OrderSpecial;
};
