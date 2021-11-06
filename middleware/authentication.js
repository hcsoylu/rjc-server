const jwt = require("jsonwebtoken");

const customError = require("../errors/custom-error");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new customError("there is no header", 400);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.company = { companyId: payload.companyId };
    next();
  } catch (error) {
    throw new customError("there is no header", 401);
  }
};

module.exports = auth;
