import express from "express";
import Vote from "../model/Vote.js";
import Candidate from "../model/Candidate.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { candidateId } = req.body;

  try {
    const existingVote = await Vote.findOne({ user: req.user.id });
    if (existingVote) {
      return res.status(400).json({ msg: "You have already voted" });
    }

    const newVote = new Vote({ user: req.user.id, candidate: candidateId });
    await newVote.save();

    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });
    res.json({ msg: "Vote recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
