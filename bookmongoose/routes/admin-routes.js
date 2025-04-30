const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../db/models/admin-schema");

const router = express.Router();

router.post("/admin/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(403).json({ message: "Email already taken" });
    }
    if (password != confirmPassword) {
      return res.status(403).json({ message: "Passwords doesnot match" });
    }

    const hashedPassword = await bcrypt.hash(password, 2);

    const newAdmin = await Admin.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Signed Up Successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({ message: "email or password incorrect" });
    }

    const isMatching = await bcrypt.compare(password, admin.password);
    if (!isMatching) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    const token = jwt.sign({ id: admin._id, role: "ADMIN" }, process.env.KEY, {
      expiresIn: "5d",
    });
    return res.status(200).json({ message: "Logged in sucessfully", token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
    if (!isMatching) {
      return res.status(400).json({ message: "Email or Password incorrect" });
    }
  }
});

module.exports = router;
