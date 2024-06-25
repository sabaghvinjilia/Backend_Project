const { Router } = require("express");
const { Users } = require("../models/users");
const { ROUTES } = require("../constants");
const { handleToken } = require("../functions/tokenHandlers");

const router = Router();

router.post(ROUTES.register, async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      throw new Error("Sign up parameter is missing");
    }

    const newUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      contacts: [],
    });

    handleToken(newUser, 201, res);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      status: "error",
      message: err.message || "",
    });
  }
});

module.exports = {
  userRegister: router,
};
