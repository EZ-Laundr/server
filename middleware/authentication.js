const { User } = require("../models");
const { verify } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
	try {
		const { access_token } = req.headers;
		const payload = await verify(access_token);
		const userData = await User.findOne({
			where: {
				email: payload.email,
			},
		});

		req.user = {
			id: userData.id,
			email: userData.email,
			phoneNumber: userData.phoneNumber,
			role: userData.role,
		};

		next();
	} catch (err) {
		next({
			name: "InvalidToken",
			msg: "authentication failed",
		});
	}
};

module.exports = authentication;
