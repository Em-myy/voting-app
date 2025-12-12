import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ msg: "Unauthorized: Invalid admin key" });
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    const admin = new User({
      username: name,
      email,
      password,
      hasVoted: false,
      isAdmin: true,
    });

    await admin.save();

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      msg: "Admin created successfully",
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, secretKey } = req.body;

  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ msg: "Unauthorized: Invalid admin key" });
  }
  try {
    const admin = await User.findOne({ email });

    if (!admin || !admin.isAdmin) {
      return res.status(401).json({ msg: "Not authorized as admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      msg: "Admin logged in successfully",
      token,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
