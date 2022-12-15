const express = require("express");
const urlController = require("../urlController/urlController");
const ErrorHandler = require("../errorHandler/ErrorHandlerClass");
const route = express.Router();

const use = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

route.post("/url/shorten", use(urlController.urlShortner));
route.get("/:urlCode", use(urlController.urlRedirect));

route.all("*", (req, res, next) => {
  next(new ErrorHandler(404, `Cannot find ${req.originalUrl}`));
});

module.exports = route;
