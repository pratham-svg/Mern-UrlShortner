const express = require("express");
const urlController = require("../urlController/urlController");
const ErrorHandler = require("../errorHandler/ErrorHandlerClass");
const route = express.Router();
route.post("/url/shorten", urlController.urlShortner);
route.get("/:urlCode", urlController.urlRedirect);

route.all("*", (req, res, next) => {
  next(new ErrorHandler(404, `Cannot find ${req.originalUrl}`));
  // res.status(404).send(`Cannot find ${req.originalUrl}`);
});

module.exports = route;
