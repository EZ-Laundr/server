const sign = require("jsonwebtoken/sign");
const { checkPassword } = require("../helpers/bcrypt");
const { User } = require("../models");

class Controller {
	static helloWorld(req, res, next) {
		try {
			res.send("Hello world");
		} catch (err) {
			next(err);
		}
	}

	static async register(req, res, next) {
		try {
			const { email, password, phoneNumber } = req.body;
			const payload = {
				email,
				password,
				phoneNumber,
				role: "customer",
			};

			const result = await User.create(payload);

			const access_token = sign({
				id: result.id,
				email,
				phoneNumber,
				role: result.role,
			});

			res.status(201).json({
				email,
				role,
				access_token,
			});
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const result = User.findOne({
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
}

module.exports = Controller;
