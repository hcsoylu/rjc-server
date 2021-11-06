const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    let errors = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");

    res.send({ msg: errors });
  }

  res.status(err.statusCode).send({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
