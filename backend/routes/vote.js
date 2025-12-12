import express from "express";
import Vote from "../model/Vote.js";
import Candidate from "../model/Candidate.js";
import User from "../model/User.js";
import { protect } from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { candidateId } = req.body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const existingVote = await Vote.findOne({ user: req.user.id }).session(
      session
    );

    if (existingVote) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "You have already voted" });
    }

    const newVote = new Vote({ user: req.user.id, candidate: candidateId });
    await newVote.save({ session });

    await Candidate.findByIdAndUpdate(
      candidateId,
      { $inc: { votes: 1 } },
      { session }
    );
    await User.findByIdAndUpdate(req.user.id, { hasVoted: true }, { session });

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: "Vote recorded successfully" });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    session.endSession();
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
