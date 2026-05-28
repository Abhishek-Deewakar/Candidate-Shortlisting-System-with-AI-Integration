const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'https://candidate-shortlisting-system-with-ai-2lc7.onrender.com',
    'http://localhost:3000'
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Routes
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/match', require('./routes/matchRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
