const { User, Order, Perfume, Service } = require("../models");

class AdminController {
  static async getOrders(req, res, next) {
    let result = await Order.findAll();
    try {
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    let result = await Order.findOne({ where: { id } });
    try {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log("error");
      }
    } catch (error) {
      next(error);
    }
  }

  static async getPerfumes(req, res, next) {
    let result = await Perfume.findAll();
    try {
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getServices(req, res, next) {
    let result = await Service.findAll();
    try {
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async;
}

module.exports = AdminController;
