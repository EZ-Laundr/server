const {
	User,
	Order,
	Perfume,
	Service,
	SpecialTreatment,
	OrderSpecial,
} = require("../models");
const { signToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcrypt");

class AdminController {
	static async getOrders(req, res, next) {
		try {
			let result = await Order.findAll({
				include: [
					{ model: User, attributes: { exclude: ["password"] } },
					{ model: OrderSpecial, include: [SpecialTreatment] },
					Service,
				],
				order: [["updatedAt", "DESC"]],
			});

			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getById(req, res, next) {
		const { id } = req.params;
		try {
			let result = await Order.findOne({
				where: { id },
				include: [
					{ model: User, attributes: { exclude: ["password"] } },
					{ model: OrderSpecial, include: [SpecialTreatment] },
					Service,
					Perfume,
				],
			});

			if (!result) {
				throw {
					name: "NotFound",
				};
			}

			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getPerfumes(req, res, next) {
		try {
			let result = await Perfume.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getServices(req, res, next) {
		try {
			let result = await Service.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getSpecialTreatments(req, res, next) {
		try {
			let result = await SpecialTreatment.findAll({
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async adminLogin(req, res, next) {
		const { email, password } = req.body;
		try {
			let result = await User.findOne({ where: { email } });
			if (!result) {
				throw {
					name: "Unauthorized",
					msg: "invalid username or email password",
				};
			} else if (result.dataValues.role !== "admin") {
				throw {
					name: "Forbidden",
					msg: "You are not an admin",
				};
			} else {
				if (checkPassword(password, result.dataValues.password)) {
					const { id, phoneNumber, role } = result.dataValues;
					const access_token = signToken({
						id,
						email,
						phone: phoneNumber,
						role,
					});

					res.status(200).json({
						email,
						role,
						access_token,
					});
				} else {
					throw {
						name: "Unauthorized",
						msg: "invalid username,email, or password",
					};
				}
			}
		} catch (error) {
			next(error);
		}
	}

	static async adminRegister(req, res, next) {
		const { email, phoneNumber, password } = req.body;
		const data = {
			email,
			phoneNumber,
			password: password,
			role: "admin",
		};
		try {
			const result = await User.create(data);
			res.status(201).json({ email: result.email, role: result.role });
		} catch (error) {
			next(error);
		}
	}

	static async addPerfume(req, res, next) {
		const { name, price, imageUrl } = req.body;
		let data = {
			name,
			price,
			imageUrl,
		};

		try {
			let result = await Perfume.create(data, {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(201).json({
				id: result.dataValues.id,
				name: result.dataValues.name,
				price: result.dataValues.price,
				imageUrl: result.dataValues.imageUrl,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addService(req, res, next) {
		const { name, price, imageUrl } = req.body;
		let data = {
			name,
			price,
			imageUrl,
		};

		try {
			let result = await Service.create(data, {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(201).json({
				id: result.dataValues.id,
				name: result.dataValues.name,
				price: result.dataValues.price,
				imageUrl: result.dataValues.imageUrl,
			});
		} catch (error) {
			next(error);
		}
	}

	static async addSpecialTreatment(req, res, next) {
		const { name, price, imageUrl } = req.body;
		let data = {
			name,
			price,
			imageUrl,
		};

		try {
			let result = await SpecialTreatment.create(data, {
				attributes: {
					exclude: ["createdAt", "updatedAt"],
				},
			});
			res.status(201).json({
				id: result.dataValues.id,
				name: result.dataValues.name,
				price: result.dataValues.price,
				imageUrl: result.dataValues.imageUrl,
			});
		} catch (error) {
			next(error);
		}
	}

	static async editPerfume(req, res, next) {
		const { id } = req.params;
		const { name, price, imageUrl } = req.body;
		let data = {
			name,
			price,
			imageUrl,
		};
		try {
			let result = await Perfume.findByPk(id);
			if (result) {
				let edit = await Perfume.update(data, {
					where: { id },
					returning: true,
				});
				let editedValue = edit[1][0].dataValues;
				delete editedValue.createdAt;
				delete editedValue.updatedAt;
				res.status(200).json(editedValue);
			}
		} catch (error) {
			next(error);
		}
	}

	static async editService(req, res, next) {
		const { id } = req.params;
		const { name, price, imageUrl } = req.body;
		let data = {
			name,
			price,
			imageUrl,
		};
		try {
			let result = await Service.findByPk(id);
			if (result) {
				let edit = await Service.update(data, {
					where: { id },
					returning: true,
				});
				let editedValue = edit[1][0].dataValues;
				delete editedValue.createdAt;
				delete editedValue.updatedAt;
				res.status(200).json(editedValue);
			}
		} catch (error) {
			next(error);
		}
	}

	static async editSpecialTreatment(req, res, next) {
		const { id } = req.params;
		const { name, price, imageUrl } = req.body;
		let data = {
			name,
			price,
			imageUrl,
		};
		try {
			let result = await SpecialTreatment.findByPk(id);
			if (result) {
				let edit = await SpecialTreatment.update(data, {
					where: { id },
					returning: true,
				});
				let editedValue = edit[1][0].dataValues;
				delete editedValue.createdAt;
				delete editedValue.updatedAt;
				res.status(200).json(editedValue);
			}
		} catch (error) {
			next(error);
		}
	}

	static async editOrder(req, res, next) {
		const { id } = req.params;
		try {
			let result = await Order.findByPk(id, { include: [Service] });

			if (!result) {
				throw {
					name: "NotFound",
				};
			}

			const weight = +req.body.weight;
			const servicePrice = result.dataValues.Service.price;
			const oldPrice = result.dataValues.totalPrice;
			const data = {
				weight,
				status: "On Progress",
				totalPrice: oldPrice + servicePrice * weight,
			};
			let edit = await Order.update(data, {
				where: { id },
				returning: true,
			});
			if (edit) {
				let editedValue = edit[1][0].dataValues;
				delete editedValue.createdAt;
				delete editedValue.updatedAt;
				res.status(200).json(editedValue);
			}
		} catch (error) {
			next(error);
		}
	}

	static async deletePerfume(req, res, next) {
		const { id } = req.params;
		try {
			let result = await Perfume.destroy({ where: { id } });

			if (!result) {
				throw {
					name: "NotFound",
				};
			}

			res
				.status(201)
				.json({ msg: `Perfume with id ${id} has been deleted succesfully` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteService(req, res, next) {
		const { id } = req.params;
		try {
			let result = await Service.destroy({ where: { id } });

			if (!result) {
				throw {
					name: "NotFound",
				};
			}

			res
				.status(201)
				.json({ msg: `Service with id ${id} has been deleted succesfully` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteSpecialTreatment(req, res, next) {
		const { id } = req.params;
		try {
			let result = await SpecialTreatment.destroy({ where: { id } });

			if (!result) {
				throw {
					name: "NotFound",
				};
			}

			res.status(201).json({
				msg: `Special Treatment with id ${id} has been deleted succesfully`,
			});
		} catch (error) {
			next(error);
		}
	}

	static async changeStatus(req, res, next) {
		try {
			const { id } = req.params;
			const result = await Order.update(
				{ status: "Done" },
				{
					where: {
						id,
					},
				}
			);

			console.log(result);

			if (!result[0]) {
				throw {
					name: "NotFound",
				};
			}

			res.status(200).json({
				msg: `Status with order id ${id} has been changed succesfully`,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = AdminController;
