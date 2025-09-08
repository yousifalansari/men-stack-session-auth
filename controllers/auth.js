const express = require("express");
const bcrypt = require("bcrypt");
const user = require('../models/user');

const router = express.Router();

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (userInDatabase) {
    return res.send("Username or Password is invalid.");
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const newUser = await User.create(req.body);
  res.send(`Thanks for signing up ${newUser.username}`);

  res.send("Form submission accepted!");
});

module.exports = router;
