const { Router } = require("express");
const { ROUTES } = require("../constants");
const { checkToken } = require("../functions/checkToken");
const { Users } = require("../models/users");

const router = Router();

router.post(ROUTES.editContact, checkToken, async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.lastname ||
      !req.body.phoneNumber ||
      !req.params.email ||
      !req.params.name
    ) {
      throw new Error("argument is missing!");
    }
    const email = req.params.email;
    const contactName = req.params.name;

    const editedContact = {
      name: req.body.name,
      lastname: req.body.lastname,
      category: req.body.category,
      phoneNumber: req.body.phoneNumber,
    };

    const user = await Users.findOne({ email });

    user.contacts = user.contacts.map((contact) => {
      if (contact.name === contactName) {
        return editedContact;
      } else {
        return contact;
      }
    });
    user.save();

    res.status(200).send({
      status: "success",
      message: "edited contact",
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
  editContact: router,
};
