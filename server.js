import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/tasksRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();



// Middleware
app.use(express.json({ limit: "50mb" })); // To parse JSON data in req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in req.body
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Thêm route Webhook
app.post("/webhook", (req, res) => {
  const event = req.body; // Nhận dữ liệu từ Webhook
  console.log("Webhook event received:", event); // Xử lý dữ liệu
  // Thực hiện các hành động cần thiết dựa trên sự kiện
  res.status(200).send("Webhook received"); // Gửi phản hồi
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () =>
  console.log(`Listening on port localhost:${PORT} hey`)
);
