const jwt = require("jsonwebtoken");
const { jwtSecret, expiresIn } = require("../constants");

const checkToken = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }

    verify(token, jwtSecret);

    next();
  } catch (err) {
    res.status(401).send({
      status: "error",
      message: "Unathorized",
    });
    console.log({ err });
  }
};

module.exports = {
  checkToken,
};
