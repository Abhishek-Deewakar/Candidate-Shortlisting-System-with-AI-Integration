# Quick Start Guide - 5 Minutes Setup

## 🚀 Get Running in 5 Steps

### Step 1: Install Backend Dependencies
```bash
cd Backend
npm install
```

### Step 2: Set Up Environment Variables
Edit `Backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/candidate-shortlisting
OPENROUTER_API_KEY=sk-xxxxxxxxxxxx
NODE_ENV=development
```

**Note:** Get your OpenRouter API key from https://openrouter.ai/

### Step 3: Install Frontend Dependencies
```bash
cd Frontend
npm install
```

### Step 4: Start MongoDB
Make sure MongoDB is running:
```bash
mongod
```

### Step 5: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
# Server runs at http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm start
# App opens at http://localhost:3000
```

## ✅ You're Done!

The app is now running! 

- 🌐 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:5000
- 🗄️ Database: MongoDB

## 📝 First Steps

1. **Add Candidates** - Go to "Add Candidate" tab
2. **Add Multiple Skills** - Type skill name and press Enter
3. **Search Matches** - Go to "Find Matches" tab
4. **Try AI Ranking** - Check "Use AI-Based Ranking" (requires OpenRouter API key)

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot connect to MongoDB` | Start MongoDB with `mongod` |
| `Cannot find module 'express'` | Run `npm install` in Backend folder |
| `Port 5000 already in use` | Change PORT in .env or kill existing process |
| `API key error` | Check OPENROUTER_API_KEY in .env |

## 📚 Full Documentation

See `README.md` for complete API documentation and features.

---

**Enjoy! 🎯**
