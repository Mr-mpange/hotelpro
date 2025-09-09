import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";

const router = Router();

// 🔹 CREATE: Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({ message: "User created", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 READ: Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 READ: Get single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 UPDATE: Update user info
router.put("/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "User updated", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE: Delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
