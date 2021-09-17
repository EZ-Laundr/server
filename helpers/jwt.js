const jwt = require("jsonwebtoken");

function sign(payload, secretcode) {
  const secretcode = "koderahasia";
  return jwt.sign(payload, secretcode);
}
function verify(token) {
  const secretcode = "koderahasia";
  return jwt.verify(token, secretcode);
}

module.exports = { verify, sign };
