const express = require('express');
const router = express.Router();
const axios = require('axios');
const Candidate = require('../models/Candidate');

// AI-Based Candidate Suggestion using OpenRouter
router.post('/shortlist', async (req, res) => {
  try {
    const { requiredSkills, minExperience, preferredSkills = [], jobDescription } = req.body;

    if (!requiredSkills || minExperience === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get all candidates
    const candidates = await Candidate.find();

    // Basic matching first
    const matchedCandidates = candidates
      .map(candidate => {
        const requiredMatch = candidate.skills.filter(skill =>
          requiredSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );
        const preferredMatch = candidate.skills.filter(skill =>
          preferredSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );

        const requiredScore = requiredMatch.length / requiredSkills.length;
        const preferredScore =
          preferredSkills.length > 0
            ? preferredMatch.length / preferredSkills.length
            : 0;

        const matchScore = requiredScore * 0.7 + preferredScore * 0.3;
        const experienceMatch = candidate.experience >= minExperience;

        return {
          name: candidate.name,
          email: candidate.email,
          skills: candidate.skills,
          experience: candidate.experience,
          matchScore: Math.round(matchScore * 100),
          experienceMatch,
          matchedSkills: requiredMatch,
        };
      })
      .filter(c => c.matchScore > 0 && c.experienceMatch)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10); // Get top 10

    // Prepare prompt for AI
    const candidatesList = matchedCandidates
      .map(
        (c, idx) =>
          `${idx + 1}. ${c.name} - Skills: ${c.skills.join(', ')} - Experience: ${c.experience} years - Match Score: ${c.matchScore}%`
      )
      .join('\n');

    const prompt = `
Job Requirements:
- Required Skills: ${requiredSkills.join(', ')}
- Minimum Experience: ${minExperience} years
- Preferred Skills: ${preferredSkills.length > 0 ? preferredSkills.join(', ') : 'None'}
${jobDescription ? `- Job Description: ${jobDescription}` : ''}

Top Candidates:
${candidatesList}

Please rank these candidates and provide:
1. Top 3 recommendations with explanations
2. Why each candidate is suitable/not suitable
3. Any concerns or gaps in their profile
4. Overall recommendation for interviews

Be concise and practical in your assessment.
    `;

    // Call OpenRouter API
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: 'OpenRouter API key not configured. Please set OPENROUTER_API_KEY in .env',
      });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiRecommendation = response.data.choices[0].message.content;

    res.json({
      jobRequirements: {
        requiredSkills,
        minExperience,
        preferredSkills,
      },
      matchedCandidatesCount: matchedCandidates.length,
      candidates: matchedCandidates,
      aiRecommendation,
      aiModel: 'openai/gpt-3.5-turbo',
    });
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error?.message || error.message,
      details: 'Make sure your OpenRouter API key is valid and has sufficient credits',
    });
  }
});

module.exports = router;
