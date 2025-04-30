const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../db/models/user-schema");

const router = express.Router();

router.post("/user/signup", async (req, res) => {
  try {
    const { name, username, password, confirmPassword } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res.status(403).json({ message: "Usename already taken" });
    }
    if (password != confirmPassword) {
      return res.status(403).json({ message: "Passwords doesnot match" });
    }

    const hashedPassword = await bcrypt.hash(password, 2);

    const newUser = await User.create({
      name: name,
      username: username,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Signed Up Successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res
        .status(400)
        .json({ message: "Username or password incorrect" });
    }

    const token = jwt.sign({ id: user._id, role: "USER" }, process.env.KEY, {
      expiresIn: "5d",
    });
    return res.status(200).json({ message: "Logged in sucessfully", token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
    if (!isMatching) {
      return res
        .status(400)
        .json({ message: "Username or Password incorrect" });
    }
  }
});

module.exports = router;
