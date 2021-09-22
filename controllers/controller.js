const { signToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcrypt");
var sha512 = require("js-sha512");
const {
	User,
	Perfume,
	Service,
	SpecialTreatment,
	Order,
	OrderSpecial,
} = require("../models");

class Controller {
	static async removeToken(req, res, next) {
		try {
			const { id } = req.user;
			const result = await User.update(
				{
					notificationToken: null,
				},
				{
					where: { id },
				}
			);
			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	static async postOrders(req, res, next) {
		try {
			const { id: UserId } = req.user;
			let {
				pickup,
				ServiceId,
				perfume,
				treatments,
				customerAddress,
				rangeAddress,
			} = req.body;

			const payload = {
				weight: 0,
				status: "pending",
				totalPrice: 0,
				pickup,
				UserId,
				ServiceId,
				customerAddress: customerAddress || "",
				rangeAddress: rangeAddress || 0,
				PerfumeId: perfume.id,
			};

			const result = await Order.create(payload, {
				include: [Perfume],
			});
			const { id } = result;
			let specialPayload;
			let result2;
			let sumSpecialTreatmentsPrices = 0;
			if (treatments) {
				specialPayload = treatments.map((treatment) => {
					return {
						SpecialTreatmentId: treatment.id,
						quantity: treatment.qty,
						OrderId: id,
						price: treatment.qty * treatment.price,
					};
				});
				result2 = await OrderSpecial.bulkCreate(specialPayload, {
					returning: true,
					include: [Order],
				});

				const specialTreatmentsPrices = result2.map((e) => e.price);

				sumSpecialTreatmentsPrices = specialTreatmentsPrices.reduce(
					(a, b) => a + b
				);
			}

			const totalPrice = sumSpecialTreatmentsPrices + perfume.price;

			const result3 = await Order.update(
				{
					totalPrice,
				},
				{
					where: {
						id,
					},
					returning: true,
				}
			);

			res.status(201).json(result3[1][0]);
		} catch (err) {
			next(err);
		}
	}

	static async getNotifPayment(req, res, next) {
		// console.log("masuk notif payment");
		try {
			let order_id = req.body.order_id;
			let status_code = req.body.status_code;
			let myServerKey = "SB-Mid-server-qPfv763v-8yrPbfvAgrgZsMw";
			const signatureMidTrans = req.body.signature_key;

			const findOrder = await Order.findOne({
				where: {
					codeTransaction: order_id,
				},
			});

			if (!findOrder) {
				throw { name: "paymentFailed" };
			} else {
				// console.log("MASUK ELSE");
				const codeTrans = findOrder.codeTransaction.toString();
				const grossFromDb = findOrder.totalPrice.toString() + ".00";
				const hashSignature = sha512(
					codeTrans + status_code + grossFromDb + myServerKey
				);

				// console.log("======", codeTrans, "==", "====codeeeee=====");

				// console.log(
				// 	"======",
				// 	grossFromDb,
				// 	"==",
				// 	req.body.gross_amount,
				// 	"=====grossFromDb===="
				// );
				// console.log(
				// 	"======",
				// 	signatureMidTrans,
				// 	"===",
				// 	hashSignature,
				// 	"========="
				// );

				let payloadNewOrder;

				if (signatureMidTrans === hashSignature) {
					payloadNewOrder = {
						statusPayment: true,
					};
					const updateOrder = await Order.update(payloadNewOrder, {
						where: {
							id: findOrder.id,
						},
					});
					// console.log(updateOrder, "updatee");
				}
			}
		} catch (error) {
			next(error);
		}
	}

	static async register(req, res, next) {
		try {
			const { email, password, phoneNumber, notificationToken } = req.body;
			const payload = {
				email,
				password,
				phoneNumber,
				notificationToken,
				role: "customer",
			};

			const result = await User.create(payload);
			const access_token = signToken({
				id: result.id,
				email,
				phoneNumber,
				role: result.role,
			});
			res.status(201).json({
				email,
				role: result.role,
				access_token,
			});
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password, notificationToken } = req.body;

			const result = await User.findOne({
				where: {
					email,
					role: "customer",
				},
			});

			if (!result) {
				throw {
					name: "Unauthorized",
					msg: "invalid username or email password",
				};
			}

			const { id, phoneNumber, role } = result;

			const result2 = await User.update(
				{
					notificationToken,
				},
				{
					where: { id, email },
				}
			);

			if (!checkPassword(password, result.password)) {
				throw {
					name: "Unauthorized",
					msg: "invalid username or email password",
				};
			}

			const access_token = signToken({
				id,
				email,
				phoneNumber,
				role,
			});

			res.status(200).json({
				email,
				role,
				access_token,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPerfumes(req, res, next) {
		try {
			const result = await Perfume.findAll();

			res.status(200).json(result);
		} catch (err) {
			/* istanbul ignore next */
			next(err);
		}
	}

	static async getServices(req, res, next) {
		try {
			const result = await Service.findAll();

			res.status(200).json(result);
		} catch (err) {
			/* istanbul ignore next */
			next(err);
		}
	}

	static async getSpecialTreatments(req, res, next) {
		try {
			const result = await SpecialTreatment.findAll();

			res.status(200).json(result);
		} catch (err) {
			/* istanbul ignore next */
			next(err);
		}
	}

	static async getOrders(req, res, next) {
		try {
			const { id: UserId } = req.user;
			const result = await Order.findAll({
				where: {
					UserId,
				},
				include: [
					{ model: OrderSpecial, include: [SpecialTreatment] },
					Perfume,
					Service,
					User,
				],
				order: [["updatedAt", "DESC"]],
			});

			res.status(200).json(result);
		} catch (err) {
			/* istanbul ignore next */
			next(err);
		}
	}

	static async getOrdersById(req, res, next) {
		try {
			const { id: UserId } = req.user;
			const id = req.params.id;

			const result = await Order.findOne({
				where: {
					id,
					UserId,
				},
				include: [
					{ model: OrderSpecial, include: [SpecialTreatment] },
					Perfume,
					Service,
					User,
				],
			});

			if (!result) {
				throw {
					name: "NotFound",
				};
			}

			res.status(200).json(result);
		} catch (err) {
			next(err);
		}
	}

	static async postOrders(req, res, next) {
		try {
			const { id: UserId } = req.user;
			let {
				pickup,
				ServiceId,
				perfume,
				treatments,
				customerAddress,
				rangeAddress,
			} = req.body;

			const payload = {
				weight: 0,
				status: "pending",
				totalPrice: 0,
				pickup,
				UserId,
				codeTransaction: new Date().getTime(),
				statusPayment: false,
				ServiceId,
				customerAddress: customerAddress || "",
				rangeAddress: rangeAddress || 0,
				PerfumeId: perfume.id,
			};

			const result = await Order.create(payload, {
				include: [Perfume],
			});

			const { id } = result;

			let specialPayload;
			let result2;
			let sumSpecialTreatmentsPrices = 0;

			if (treatments) {
				specialPayload = treatments.map((treatment) => {
					return {
						SpecialTreatmentId: treatment.id,
						quantity: treatment.qty,
						OrderId: id,
						price: treatment.qty * treatment.price,
					};
				});
				result2 = await OrderSpecial.bulkCreate(specialPayload, {
					returning: true,
					include: [Order],
				});

				const specialTreatmentsPrices = result2.map((e) => e.price);

				sumSpecialTreatmentsPrices = specialTreatmentsPrices.reduce(
					(a, b) => a + b
				);
			}

			const totalPrice = sumSpecialTreatmentsPrices + perfume.price;

			const result3 = await Order.update(
				{
					totalPrice,
				},
				{
					where: {
						id,
					},
					returning: true,
				}
			);

			res.status(201).json(result3[1][0]);
		} catch (err) {
			/* istanbul ignore next */
			next(err);
		}
	}
}

module.exports = Controller;
