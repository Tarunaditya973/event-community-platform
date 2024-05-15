const jwt = require("jsonwebtoken");

module.exports.createsecrettoken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN);
};
