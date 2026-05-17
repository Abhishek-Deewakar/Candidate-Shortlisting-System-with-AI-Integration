const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Add Candidate
router.post('/', async (req, res) => {
  try {
    const { name, email, skills, experience, projects, bio } = req.body;

    // Validation
    if (!name || !email || !skills || experience === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if candidate already exists
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ error: 'Candidate with this email already exists' });
    }

    const newCandidate = new Candidate({
      name,
      email,
      skills,
      experience,
      projects,
      bio,
    });

    await newCandidate.save();
    res.status(201).json({
      message: '✅ Candidate added successfully',
      candidate: newCandidate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json({
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Candidate
router.put('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: '✅ Candidate updated successfully',
      candidate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Candidate
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
