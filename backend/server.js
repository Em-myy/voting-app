import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authenticationRoutes from "./routes/authentication.js";
import voteRoutes from "./routes/vote.js";
import candidateRoutes from "./routes/candidate.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/authentication", authenticationRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/admin", adminRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    })
  )
  .catch((error) => {
    console.log(error);
  });
