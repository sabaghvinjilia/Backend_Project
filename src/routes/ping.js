const { Router } = require("express");
const { ROUTES } = require("../constants");

const router = Router();
router.get(ROUTES.ping, async (req, res) => {
  res.send({
    status: "success - ping",
    message: "server is up and running",
  });
});

module.exports = {
  ping: router,
};
