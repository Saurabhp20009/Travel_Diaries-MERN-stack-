const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secretkey");


const verifyToken = (req, res, next) => {
  let bearer = req.headers["authorization"];

  if (bearer !== undefined) {
    bearer = bearer.split(" ");
    const token = bearer[1];
    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res.send({ message: "Invalid Token" });
      } 
    });
  }

  next();
};

module.exports = { verifyToken };
