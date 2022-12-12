const express = require("express");
const urlController = require("../urlController/urlController");
const route = express.Router();
route.post("/url/shorten", urlController.urlShortner);
route.get("/:urlCode", urlController.urlRedirect);

route.all("*", (req, res) => {
  res.status(404).send(`Cannot find ${req.originalUrl}`);
});
module.exports = route;
