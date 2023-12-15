const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secret = process.env.SECRET_KEY;
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      role: "realUser",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Registration failed. Choose a different username." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const realUser = await User.findOne({ username });
    const user = {
      name: realUser.username,
      role: realUser.role,
    };
    if (!realUser || !(await bcrypt.compare(password, realUser.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: realUser._id, username: realUser.username },
      secret,
      {
        expiresIn: "1h",
      }
    );
    // console.log("Generated Token:", token);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed. Check your credentials." });
  }
});

module.exports = router;
