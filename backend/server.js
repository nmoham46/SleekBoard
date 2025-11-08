import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).type("text/plain").send("Server works");
  console.log("Server works")
});

app.post("/api/userstories", (req, res) => {
  console.log("Received user story from frontend:", req.body);

  return res.status(201).json({
    ok: true,
    message: "Backend received the story!",
    data: req.body
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
