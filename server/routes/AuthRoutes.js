import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "rahasia_super_aman";

// 📩 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username sudah dipakai" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed });
    await user.save();

    res.json({ message: "Registrasi berhasil" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User tidak ditemukan" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
