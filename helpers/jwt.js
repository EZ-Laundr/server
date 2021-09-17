const jwt = require("jsonwebtoken");
const secretcode = "koderahasia";

function signToken(payload) {
  return jwt.sign(payload, secretcode);
}
function verifyToken(token) {
  return jwt.verify(token, secretcode);


module.exports = { verifyToken, signToken };
