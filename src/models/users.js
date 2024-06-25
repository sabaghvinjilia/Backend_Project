const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { contactSchema } = require("./contact");

const Schema = mongoose.Schema;

const users = new Schema({
  username: {
    type: String,
    required: [true, "Enter username"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Enter an email"],
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    minlength: 6,
    select: false,
  },
  contacts: {
    type: [contactSchema],
    default: [],
  },
});

users.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

users.methods.checkPassword = async function (toCheckPwd, userPassword) {
  return await bcrypt.compare(toCheckPwd, userPassword);
};

const Users = mongoose.model("Users", users);

module.exports = { Users };
