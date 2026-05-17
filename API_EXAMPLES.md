/**
 * Backend API Response Examples
 */

// ============================================
// CANDIDATE ENDPOINTS
// ============================================

// 1. POST /api/candidates - Add Candidate
// Request:
{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": 2,
  "projects": "E-commerce platform, Blog API",
  "bio": "Full-stack developer with focus on MERN stack"
}

// Response:
{
  "message": "✅ Candidate added successfully",
  "candidate": {
    "_id": "123abc",
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "skills": ["React", "Node.js", "MongoDB"],
    "experience": 2,
    "projects": "E-commerce platform, Blog API",
    "bio": "Full-stack developer with focus on MERN stack",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}

// ============================================
// 2. GET /api/candidates - Get All Candidates
// ============================================

// Response:
{
  "count": 3,
  "candidates": [
    {
      "_id": "123abc",
      "name": "Rahul Sharma",
      "email": "rahul@gmail.com",
      "skills": ["React", "Node.js", "MongoDB"],
      "experience": 2,
      "projects": "E-commerce platform, Blog API",
      "bio": "Full-stack developer",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    // ... more candidates
  ]
}

// ============================================
// MATCHING ENDPOINTS
// ============================================

// 3. POST /api/match - Basic Skill Matching
// Request:
{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 1,
  "preferredSkills": ["MongoDB", "AWS"]
}

// Response:
{
  "jobRequirements": {
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 1,
    "preferredSkills": ["MongoDB", "AWS"]
  },
  "totalCandidates": 5,
  "matchedCount": 3,
  "candidates": [
    {
      "_id": "123abc",
      "name": "Priya Singh",
      "email": "priya@gmail.com",
      "skills": ["React", "Node.js", "AWS", "MongoDB"],
      "experience": 3,
      "matchScore": 95,
      "experienceMatch": true,
      "requiredMatchCount": 2,
      "preferredMatchCount": 2,
      "matchedSkills": ["React", "Node.js"]
    },
    {
      "_id": "456def",
      "name": "Rahul Sharma",
      "email": "rahul@gmail.com",
      "skills": ["React", "Node.js", "MongoDB"],
      "experience": 2,
      "matchScore": 67,
      "experienceMatch": true,
      "requiredMatchCount": 2,
      "preferredMatchCount": 1,
      "matchedSkills": ["React", "Node.js"]
    }
  ]
}

// ============================================
// AI ENDPOINTS
// ============================================

// 4. POST /api/ai/shortlist - AI-Powered Ranking
// Request:
{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 2,
  "preferredSkills": ["AWS"],
  "jobDescription": "We need a senior full-stack developer to lead our new project"
}

// Response:
{
  "jobRequirements": {
    "requiredSkills": ["React", "Node.js"],
    "minExperience": 2,
    "preferredSkills": ["AWS"]
  },
  "matchedCandidatesCount": 2,
  "candidates": [
    {
      "name": "Priya Singh",
      "email": "priya@gmail.com",
      "skills": ["React", "Node.js", "AWS", "MongoDB"],
      "experience": 3,
      "matchScore": 95,
      "experienceMatch": true,
      "matchedSkills": ["React", "Node.js"]
    }
  ],
  "aiRecommendation": "Based on the job requirements and candidate profiles:\n\n1. **TOP RECOMMENDATION: Priya Singh (95%)**\n   - Has all required skills: React, Node.js\n   - Preferred AWS skill is present\n   - 3 years experience exceeds 2-year minimum\n   - Excellent full-stack profile\n   - Ready for immediate contribution\n\n2. Rahul Sharma (67%)\n   - Has required skills but missing AWS\n   - 2 years meets minimum requirement\n   - Good foundation, may need AWS training\n\nRECOMMENDATION: Interview Priya Singh immediately. She's an excellent fit for the role.",
  "aiModel": "openai/gpt-3.5-turbo"
}

// ============================================
// ERROR RESPONSES
// ============================================

// Missing Required Fields
{
  "error": "Missing required fields"
}

// Candidate Already Exists
{
  "error": "Candidate with this email already exists"
}

// Invalid Skill Matching
{
  "error": "Missing required fields"
}

// OpenRouter API Error
{
  "error": "Invalid API key provided",
  "details": "Make sure your OpenRouter API key is valid and has sufficient credits"
}

// ============================================
// SCORING FORMULA
// ============================================

/*
MATCH SCORE CALCULATION:

1. Required Skills Match
   - Count matched skills / total required skills
   - Weight: 70%

2. Preferred Skills Match (if any)
   - Count matched skills / total preferred skills
   - Weight: 30%

3. Final Score
   - (Required_Score × 0.7) + (Preferred_Score × 0.3)
   - Multiplied by 100 for percentage

4. Experience Filter
   - Candidate's years >= minimum experience required

EXAMPLE:
- Required: ["React", "Node.js"] (2 skills)
- Preferred: ["AWS", "MongoDB"] (2 skills)
- Candidate has: ["React", "Node.js", "AWS"]

Required Match: 2/2 = 1.0 = 100%
Preferred Match: 1/2 = 0.5 = 50%
Final Score: (1.0 × 0.7) + (0.5 × 0.3) = 0.7 + 0.15 = 0.85 = 85%
*/
