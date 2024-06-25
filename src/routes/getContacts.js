const { Router } = require("express");
const { ROUTES } = require("../constants");
const { checkToken } = require("../functions/checkToken");
const { Users } = require("../models/users");

const router = Router();

router.get(ROUTES.getContacts, checkToken, async (req, res) => {
  try {
    if (!req.params.email) {
      throw new Error("email is missing!");
    }
    const email = req.params.email;
    const user = await Users.findOne({ email });

    res.status(200).send({
      status: "success",
      notes: user.contacts,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      status: "error",
      message: err.message ? "something went wrong" : "",
    });
  }
});

module.exports = {
  getContacts: router,
};
