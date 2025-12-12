import express from "express";
import Candidate from "../model/Candidate.js";
import { adminProtect } from "../middleware/adminProtect.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.send(candidates);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error finding candidates" });
  }
});

router.post("/", adminProtect, async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res
      .status(201)
      .json({ msg: "candidates added successfully", newCandidate });
  } catch (error) {
    res.status(400).json({ msg: "Error creating candidate" });
  }
});

export default router;
