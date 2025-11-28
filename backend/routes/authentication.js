import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser === true) {
    return res.status(400).json({ msg: "user already exists" });
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user.isAdmin) {
    return res
      .status(403)
      .json({ msg: "Admins must use the admin login page" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "invalid password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user });
});

router.get("/profile", protect, async (req, res) => {
  res.json({ user: req.user });
});
export default router;
