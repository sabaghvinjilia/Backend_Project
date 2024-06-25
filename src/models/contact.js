const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  category: {
    type: String,
    enum: ["important", "favorite", "regular", "work", "familyMemberF"],
    default: "regular",
  },
  name: {
    type: String,
    unique: true,
    required: [true, "Enter a name"],
  },
  lastname: {
    type: String,
    required: [true, "Enter a lastname"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Enter a description for the note"],
  },
  email: {
    type: String,
    lowercase: true,
    default: "",
  },
});

module.exports = { contactSchema };
