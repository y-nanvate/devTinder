const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodeObj = jwt.verify(token, "Yogesh@7729");
    const { _id } = decodeObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
