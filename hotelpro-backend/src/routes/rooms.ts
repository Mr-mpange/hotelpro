import { Router } from "express";
import { Room } from "../models/Room";

const router = Router();

// CREATE Room
router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// READ all Rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// READ single Room
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// UPDATE Room
router.put("/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    await room.update(req.body);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// DELETE Room
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    await room.destroy();
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
