const jwt = require("jsonwebtoken");
const { User } = require("../models");

function sign(payload, secretcode) {
  return jwt.sign({ payload }, secretcode);
}

async function authentication(req, res, next) {
  const { access_token } = req.headers;

  try {
    if (access_token) {
      const tokenUser = jwt.verify(access_token, process.env.secretpassword);
      let result = await User.findByPk(tokenUser.payload.payload);
      if (result) {
        req.user = { id: result.dataValues.id, role: result.dataValues.role };
        if (result) {
          next();
        } else {
          throw {
            code: 401,
            name: "invalidJWT",
          };
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication, sign, authorization };
