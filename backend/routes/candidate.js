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

router.get("/details/:id", adminProtect, async (req, res) => {
  const id = req.params.id;

  try {
    const candidate = await Candidate.findById(id);

    res.status(200).json({ candidate });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error getting details" });
  }
});

router.patch("/edit/:id", adminProtect, async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCandidates = await Candidate.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );

    res.status(200).json({ msg: "Candidate updated successfully" });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.delete("/delete/:id", adminProtect, async (req, res) => {
  const id = req.params.id;

  try {
    await Candidate.findByIdAndDelete(id);

    res.status(200).json({ msg: "Candidate deleted successfuly" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Error deleting candidate" });
  }
});

export default router;
