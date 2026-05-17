# 🎯 Candidate Shortlisting System with AI Integration

A full-stack web application for intelligent candidate management and AI-powered skill matching using OpenRouter API.

## 📋 Features

### Core Functionality
- ✅ **Candidate Management** - Add, view, and manage candidate profiles
- 🔍 **Skill-Based Matching** - Match candidates based on required and preferred skills
- 📊 **Experience Filtering** - Filter by minimum experience requirements
- 🤖 **AI-Powered Ranking** - Use OpenRouter API for intelligent candidate suggestions
- 💾 **MongoDB Database** - Persistent storage of candidate data
- 🎨 **Modern UI** - Beautiful React frontend with gradient design

### Bonus Features
- 📈 Visual match score display
- 🏆 Ranking from high to low matches
- 💡 AI-generated explanations for recommendations
- 🗑️ Delete candidates
- 🔄 Real-time updates

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- OpenRouter API Integration
- Axios for HTTP requests

**Frontend:**
- React 18
- CSS3 with gradients
- Axios for API calls

## 📦 Project Structure

```
ESE_Sample/
├── Backend/
│   ├── server.js                 # Main server file
│   ├── package.json              # Dependencies
│   ├── .env                       # Environment variables
│   ├── models/
│   │   └── Candidate.js           # MongoDB schema
│   └── routes/
│       ├── candidateRoutes.js     # Candidate CRUD endpoints
│       ├── matchRoutes.js         # Basic matching logic
│       └── aiRoutes.js            # AI-powered shortlisting
└── Frontend/
    ├── package.json               # React dependencies
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    └── src/
        ├── App.js                 # Main app component
        ├── App.css                # Styling
        ├── index.js
        ├── index.css
        └── components/
            ├── CandidateForm.js   # Add candidate form
            ├── CandidateList.js   # Display candidates
            ├── JobMatchForm.js    # Job matching form
            └── ShortlistedCandidates.js # Results display
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB running locally or MongoDB Atlas connection string
- OpenRouter API key (for AI features)

### 1. Backend Setup

```bash
cd Backend
npm install
```

**Configure Environment Variables:**
Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/candidate-shortlisting
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
```

**Start Backend:**
```bash
npm run dev    # With nodemon (auto-reload)
# OR
npm start      # Standard start
```

Backend runs at: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd Frontend
npm install
```

**Start Frontend:**
```bash
npm start
```

Frontend opens at: `http://localhost:3000`

## 📡 API Endpoints

### Candidate Management

#### Add Candidate
```
POST /api/candidates
Content-Type: application/json

{
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": 2,
  "projects": "E-commerce platform, Blog app",
  "bio": "Full-stack developer with 2 years experience"
}
```

#### Get All Candidates
```
GET /api/candidates

Response:
{
  "count": 5,
  "candidates": [...]
}
```

#### Get Single Candidate
```
GET /api/candidates/:id
```

#### Update Candidate
```
PUT /api/candidates/:id
```

#### Delete Candidate
```
DELETE /api/candidates/:id
```

### Job Matching

#### Basic Skill Matching
```
POST /api/match
Content-Type: application/json

{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 1,
  "preferredSkills": ["MongoDB", "AWS"]
}

Response:
{
  "jobRequirements": {...},
  "totalCandidates": 5,
  "matchedCount": 3,
  "candidates": [
    {
      "name": "Rahul",
      "matchScore": 95,
      "experienceMatch": true,
      "matchedSkills": ["React", "Node.js"]
    }
  ]
}
```

#### AI-Powered Shortlisting
```
POST /api/ai/shortlist
Content-Type: application/json

{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 1,
  "preferredSkills": ["MongoDB"],
  "jobDescription": "Looking for a Full-stack developer for our web team"
}

Response:
{
  "candidates": [...],
  "aiRecommendation": "Top candidate is Rahul because...",
  "aiModel": "openai/gpt-3.5-turbo"
}
```

## 🤖 OpenRouter API Setup

1. **Create Account:** Go to https://openrouter.ai/
2. **Get API Key:** Navigate to Keys section and create a new key
3. **Add to .env:**
   ```
   OPENROUTER_API_KEY=your_key_here
   ```
4. **Fund Your Account:** Add credits to your OpenRouter account

## 💾 MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# MongoDB will be available at: mongodb://localhost:27017
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/candidate-shortlisting
   ```

## 📊 Matching Algorithm

The system uses a weighted scoring system:

1. **Required Skills Match** (70% weight)
   - Calculate overlap: matched_skills / required_skills

2. **Preferred Skills Match** (30% weight)
   - Calculate overlap: matched_skills / preferred_skills

3. **Final Score** = (Required_Score × 0.7) + (Preferred_Score × 0.3)

4. **Filtering**
   - Candidates must meet minimum experience requirement
   - Only candidates with > 0% match score are shown

## 🤖 AI Ranking Features

The AI analyzes:
- ✓ Skill relevance and proficiency levels
- ✓ Experience years vs. requirements
- ✓ Project history alignment
- ✓ Overall fit for the role
- ✓ Gaps in candidate profile

**AI provides:**
- Top 3 recommendations with explanations
- Suitability assessment
- Potential concerns or gaps
- Interview readiness score

## 🧪 Testing the System

### Sample Data

**Add Candidates:**
```json
{
  "name": "Priya Singh",
  "email": "priya@gmail.com",
  "skills": ["React", "Node.js", "AWS", "MongoDB"],
  "experience": 3,
  "projects": "SaaS platform, Mobile app backend",
  "bio": "Senior full-stack developer"
}
```

**Test Job Matching:**
```json
{
  "requiredSkills": ["React", "Node.js"],
  "minExperience": 2,
  "preferredSkills": ["AWS"]
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify firewall/network access

### OpenRouter API Error
- Check API key is valid
- Verify account has credits
- Check rate limits

### Frontend Connection Error
- Ensure backend is running on port 5000
- Check proxy setting in `Frontend/package.json`
- Clear browser cache

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Backend server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/candidate-shortlisting |
| OPENROUTER_API_KEY | OpenRouter API key for AI features | sk-xxxx... |
| NODE_ENV | Environment mode | development |

## 🎨 UI Features

- 📱 Responsive design (mobile, tablet, desktop)
- 🎯 Gradient backgrounds
- ✨ Smooth animations
- 📊 Match score visualizations
- 🏷️ Skill badges and tags
- 📝 Status messages (success, error, loading)

## 🚄 Performance Tips

- Candidates are loaded on-demand
- AI suggestions use caching where possible
- Database indexes on email and skills
- Frontend pagination for large lists (can be added)

## 🔐 Security Considerations

- Use environment variables for sensitive data
- Validate all inputs on backend
- Implement rate limiting (future)
- Add authentication (future)
- Sanitize user inputs

## 📚 Future Enhancements

- [ ] User authentication & roles
- [ ] Interview scheduling
- [ ] AI-generated interview questions
- [ ] Candidate communication templates
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Resume parsing with AI
- [ ] Bulk candidate import
- [ ] Advanced filtering options
- [ ] Candidate comparison tool

## 📄 License

MIT License - feel free to use this project!

## 🤝 Support

For issues or questions, check the troubleshooting section or review the API documentation.

---

**Happy Recruiting! 🎯✨**
