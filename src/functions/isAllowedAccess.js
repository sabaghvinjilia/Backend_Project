const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");

const isAllowed = async (req) => {
  let token;
  if (
    req.headers.authorization.startsWith("Bearer") &&
    req.headers.authorization
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) throw new Error("Login first.");

  jwt.verify(token, jwtSecret);

  return currentUser;
};

module.exports = {
  isAllowed,
};
