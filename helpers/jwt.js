const jwt = require("jsonwebtoken");
const secretcode = "koderahasia";

function sign(payload, secretcode) {
	return jwt.sign(payload, secretcode);
}
function verify(token) {
	return jwt.verify(token, secretcode);
}

module.exports = { verify, sign };
