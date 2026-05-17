const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Basic Shortlisting Logic
router.post('/', async (req, res) => {
  try {
    const { requiredSkills, minExperience, preferredSkills = [] } = req.body;

    if (!requiredSkills || minExperience === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const candidates = await Candidate.find();

    const matchedCandidates = candidates
      .map(candidate => {
        // Calculate required skills match
        const requiredMatch = candidate.skills.filter(skill =>
          requiredSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );

        // Calculate preferred skills match
        const preferredMatch = candidate.skills.filter(skill =>
          preferredSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );

        // Calculate match score
        const requiredScore =
          requiredMatch.length / requiredSkills.length;
        const preferredScore =
          preferredSkills.length > 0
            ? preferredMatch.length / preferredSkills.length
            : 0;

        // Overall score (70% required, 30% preferred)
        const matchScore = requiredScore * 0.7 + preferredScore * 0.3;

        // Experience criteria
        const experienceMatch = candidate.experience >= minExperience;

        return {
          ...candidate.toObject(),
          matchScore: Math.round(matchScore * 100),
          experienceMatch,
          requiredMatchCount: requiredMatch.length,
          preferredMatchCount: preferredMatch.length,
          matchedSkills: requiredMatch,
        };
      })
      .filter(c => c.matchScore > 0 && c.experienceMatch)
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      jobRequirements: {
        requiredSkills,
        minExperience,
        preferredSkills,
      },
      totalCandidates: candidates.length,
      matchedCount: matchedCandidates.length,
      candidates: matchedCandidates,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
