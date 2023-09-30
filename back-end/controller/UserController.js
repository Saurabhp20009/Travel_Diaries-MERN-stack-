const { userModel } = require("../Models/UserModel");

const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/secretkey");

const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  let tokenGenerated;
  if (!name || !email || !password) {
    return res.json("Invalid details");
  }

  try {
    const userInDb = await userModel.findOne({ email: email });
    if (userInDb !== null) return res.json("User Already exist");
  } catch (error) {
    return res.json({ message: "error" });
  }

  let Posts = [];
  let saveData = new userModel({ name, email, password, Posts });
  
  jwt.sign(
    { email, password },
    secretKey,
    { expiresIn: "1h" },
    (err, token) => {
     
      if (!err) {
        tokenGenerated = token;
      } else res.json({ message: "unable to generate token" });
    }
  );
  const result = await saveData.save();
  res.json({ resultDB: result, tokenGen: tokenGenerated });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  var tokenGeneratedLogin;

  if (!email || !password) return res.json("Invalid details");
  try {
    const userInDb = await userModel.findOne({ email: email });
    if (userInDb.password === password) {
      jwt.sign(
        { email, password },
        secretKey,
        { expiresIn: "1h" },
        (err, token) => {
          if (!err) {
            tokenGeneratedLogin = token;
            res.json({ resultDB: userInDb, tokenGen: tokenGeneratedLogin });
          } else {
            res.json({ message: "unable to generate token" });
          }
        }
      );
    }
  } catch (error) {
    return res.json({ message: "error" });
  }
};

module.exports = { Signup, Login };
