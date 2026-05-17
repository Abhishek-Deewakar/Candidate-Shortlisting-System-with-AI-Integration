const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
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
