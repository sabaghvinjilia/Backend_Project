const { Router } = require("express");
const { ROUTES } = require("../constants");
const { checkToken } = require("../functions/checkToken");
const { Users } = require("../models/users");

const router = Router();

router.post(ROUTES.addContact, checkToken, async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.lastname ||
      !note.category ||
      !req.body.phoneNumber
    ) {
      throw new Error("parameters not provided");
    }

    const newContact = {
      name: req.body.name,
      lastname: req.body.lastname,
      category: note.category,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email ?? "",
    };
    const email = req.body.userEmail;

    const user = await Users.findOne({ email });
    user.contacts.push(newContact);
    await user.save();

    res.status(201).send({
      status: "success",
      message: "created new contact",
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
  addContact: router,
};
