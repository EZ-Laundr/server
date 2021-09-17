const onlyAdmin = async (req, res, next) => {
	try {
		const { role } = req.user;

		if (role !== "admin") {
			throw {
				name: "Forbidden",
				msg: "you didn't have permission",
			};
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = onlyAdmin;
