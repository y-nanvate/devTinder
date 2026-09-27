const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpdate } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/singup", async (req, res) => {
  try {
    validateSignUpdate(req);
    const [firstName, lastName, emailId, password] = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User data added successfully");
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = await jwt.sign({ _id: user._id }, "Yogesh@7729", {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.send("login successfully");
  } else {
    throw new Error("Invalid User credentials");
  }

  res.send(uesr);
});

authRouter.post("/logout", async(req, res)=>{

    res.cookie("token", null ,{
        expires: new Date(Date.now()),
    })
    res.send("Logout Successfully")

})

module.exports = authRouter;
