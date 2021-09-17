"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Perfume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Perfume.hasMany(models.Order);
    }
  }
  Perfume.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Perfume",
    }
  );
  return Perfume;
};
