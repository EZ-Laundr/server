function errorHandling(err, req, res, next) {
    let code;
    const msg = [];
    const errBadReq = [
        "SequelizeValidationError",
        "SequelizeConstraintError",
        "SequelizeUniqueConstraintError",
        "InvalidImage",
    ];

    if (errBadReq.find((e) => e === err.name)) {
        code = 400;
        err.errors.forEach((error) => msg.push(error.message));
    } else if (err.name === "InvalidToken" || err.name === "Unauthorized") {
        code = 401;
        msg.push(err.msg);
    } else if (err.name === "Forbidden") {
        code = 403;
        msg.push(err.msg);
    } else if (err.name === "NotFound") {
        code = 404;
        msg.push("it seems what you trying to find doesnt exist");
    } else {
        code = 500;
        msg.push("Internal server error");
    }

    res.status(code).json({
        msg,
    });
}

module.exports = errorHandling;
