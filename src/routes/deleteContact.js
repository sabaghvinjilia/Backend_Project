const { Router } = require("express");
const { ROUTES } = require("../constants");
const { checkToken } = require("../functions/checkToken");
const { Users } = require("../models/users");

const router = Router();

router.post(ROUTES.deleteContact, checkToken, async (req, res) => {
  try {
    if (!req.body.email || !req.body.name) {
      throw new Error("parameter's missing");
    }
    const email = req.params.email;
    const contactName = req.params.name;

    const user = await Users.findOne({ email });

    user.contacts = user.contacts.filter(
      (contact) => contact.name !== contactName
    );
    user.save();

    res.status(200).send({
      status: "success",
      message: "deleted contact",
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
  deleteContact: router,
};
