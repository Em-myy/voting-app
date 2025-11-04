import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: { type: String, requied: true },
  party: { type: String },
  votes: { type: Number, default: 0 },
});

export default mongoose.model("Candidate", candidateSchema);
