const { Router } = require("express");
const { Users } = require("../models/users");
const { ROUTES } = require("../constants");
const { handleToken } = require("../functions/tokenHandlers");

const router = Router();

router.post(ROUTES.login, async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide email and password!");
    }
    const { email, password } = req.body;

    const user = await Users.findOne({ email }).select("+password");

    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    handleToken(user, 200, res);
  } catch (err) {
    console.log({ err });
    res.status(401).send({
      status: "error",
      message: err.message || "",
    });
  }
});

module.exports = {
  userLogin: router,
};
