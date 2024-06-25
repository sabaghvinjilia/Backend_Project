const { ping } = require("../routes/ping");
const { userLogin } = require("../routes/userLogin");
const { userRegister } = require("../routes/userRegister");
const { getContacts } = require("../routes/getContacts");
const { addContact } = require("../routes/addContact");
const { deleteContact } = require("../routes/deleteContact");
const { editContact } = require("../routes/editContact");

const loadRoutes = (app) => {
  app.use(ping);
  app.use(userLogin);
  app.use(userRegister);
  app.use(getContacts);
  app.use(addContact);
  app.use(deleteContact);
  app.use(editContact);
};

module.exports = {
  loadRoutes,
};
