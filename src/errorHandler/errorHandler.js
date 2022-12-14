module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = "false";
  return res
    .status(err.statusCode)
    .send({ status: err.status, message: err.message });
};
