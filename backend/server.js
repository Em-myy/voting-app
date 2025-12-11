import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authenticationRoutes from "./routes/authentication.js";
import voteRoutes from "./routes/vote.js";
import candidateRoutes from "./routes/candidate.js";
import adminRoutes from "./routes/admin.js";
import Candidate from "./model/Candidate.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/api/authentication", authenticationRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/admin", adminRoutes);

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);

  (async () => {
    try {
      const candidates = await Candidate.find();
      socket.emit("results: ", candidates);
    } catch (error) {
      console.log(error);
    }
  })();

  socket.on("disconnect", () => {
    console.log("CLient disconnected", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    })
  )
  .catch((error) => {
    console.log(error);
  });
