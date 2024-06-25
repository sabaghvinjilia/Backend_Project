const jwt = require("jsonwebtoken");
const { jwtCookieExpiresIn, jwtSecret, expiresIn } = require("../constants");

const signJwt = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn,
  });
};

const handleToken = (user, statusCode, res) => {
  const token = signJwt(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + jwtCookieExpiresIn * 24 * 60 * 1000),
    httpOnly: true,
  };
  cookieOptions.secure = false;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

module.exports = {
  signJwt,
  handleToken,
};
