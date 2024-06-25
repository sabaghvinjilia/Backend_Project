require("dotenv").config();

const PORT = process.env.PORT || 8000;
const dbUri = process.env.DB_URI || "";
const jwtSecret = process.env.JWT_SECRET || "";
const expiresIn = process.env.EXPIRES_IN || "";
const jwtCookieExpiresIn = process.env.expiresIn || "";

const ROUTES = {
  editContact: "/editContact/:email/:name",
  addContact: "/addContact",
  deleteContact: "/deleteContact/:email/:name",
  getContacts: "/getContacts/:email",
  login: "/login",
  register: "/register",
  ping: "/ping",
};

const contactCategories = {
  important: "important",
  favotite: "favorite",
  work: "work",
  familyMember: "familyMember",
  regular: "regular",
};

module.exports = {
  PORT,
  dbUri,
  jwtSecret,
  expiresIn,
  ROUTES,
  jwtCookieExpiresIn,
  contactCategories,
};
