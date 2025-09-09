import { Router } from "express";
import { Booking } from "../models/Booking";

const router = Router();

// Create booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
});

export default router;
