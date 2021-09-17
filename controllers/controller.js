class Controller {
	static helloWorld(req, res, next) {
		try {
			res.send("Hello world");
		} catch (err) {
			next(err);
		}
	}
}

module.exports = Controller;
