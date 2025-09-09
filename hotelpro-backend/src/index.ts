import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./db";

// Import routes
import roomRoutes from "./routes/rooms";
import authRoutes from "./routes/auth";
import bookingRoutes from "./routes/bookings";
import paymentRoutes from "./routes/payments"; // <- new

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use("/rooms", roomRoutes);
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes); // <- new

// Test root route
app.get("/", (req, res) => {
  res.send("HotelPro Backend is running!");
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Database synchronized with schema changes');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
  console.error('❌ Database sync failed:', error);
});
