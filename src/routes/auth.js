const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpdate } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpdate(req);

    const { firstName, lastName, emailId, password } = req.body;
    const normalizedEmail = String(emailId).trim().toLowerCase();
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId: normalizedEmail,
      password: passwordHash,
    });

    await user.save();
    return res.status(201).send("User data added successfully");
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const emailId = String(req.body.emailId || "").trim().toLowerCase();
    const password = req.body.password;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid User credentials");
    }

    const token = jwt.sign({ _id: user._id }, "Yogesh@7729", {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send("Login successfully");
  } catch (err) {
    return res.status(500).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.send("Logout Successfully");
});

module.exports = authRouter;
