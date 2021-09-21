"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Service);
      Order.belongsTo(models.Perfume);
      Order.hasMany(models.OrderSpecial);
    }
  }
  Order.init(
    {
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "weight cannot be empty",
          },
          notNull: {
            msg: "weight cannot be empty",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "status cannot be empty",
          },
          notNull: {
            msg: "status cannot be empty",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "total price cannot be empty",
          },
          notNull: {
            msg: "total price cannot be empty",
          },
        },
      },
      pickup: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "pickup cannot be empty",
          },
          notNull: {
            msg: "pickup cannot be empty",
          },
        },
      },
      customerAddress: DataTypes.STRING,
      rangeAddress: DataTypes.INTEGER,
      codeTransaction: DataTypes.STRING,
      statusPayment: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
