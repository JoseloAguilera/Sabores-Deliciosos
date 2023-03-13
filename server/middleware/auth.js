const jwt = require("jsonwebtoken");
const config = require("config");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(450).send("Access denied, Token required!");

  try {
    const decoded = jwt.verify(token, process.env.jwtKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(450).send("Invalid token.");
  }
};