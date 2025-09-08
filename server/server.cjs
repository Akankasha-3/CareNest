const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/caretakers';
mongoose.connect(MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, enum: ['user', 'provider'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Companionship Schema
const companionshipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companionType: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });
const Companionship = mongoose.model('Companionship', companionshipSchema);

// Home Nursing Schema
const homeNursingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nurseType: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });
const HomeNursing = mongoose.model('HomeNursing', homeNursingSchema);

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes

// Companionship Service Request
app.post('/api/companionship', auth, async (req, res) => {
  try {
    const { companionType, date, notes } = req.body;
    if (!companionType || !date) {
      return res.status(400).json({ message: 'Companion type and date are required' });
    }
    const companionship = new Companionship({
      userId: req.user._id,
      companionType,
      date,
      notes
    });
    await companionship.save();
    res.status(201).json({ message: 'Companionship request submitted', companionship });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Home Nursing Service Request
app.post('/api/home-nursing', auth, async (req, res) => {
  try {
    const { nurseType, date, notes } = req.body;
    if (!nurseType || !date) {
      return res.status(400).json({ message: 'Nurse type and date are required' });
    }
    const homeNursing = new HomeNursing({
      userId: req.user._id,
      nurseType,
      date,
      notes
    });
    await homeNursing.save();
    res.status(201).json({ message: 'Home nursing request submitted', homeNursing });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, userType } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password, phone, userType });
    await user.save();

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        userType: user.userType
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      userType: req.user.userType
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
