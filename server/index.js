const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client's URL
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Enable preflight for all routes

const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for the connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define User Model outside of routes
const User = mongoose.model('User', {
  username: String,
  uid: String,
});

// Define Election Model outside of routes
const electionSchema = new mongoose.Schema({
  title: String,
  description: String,
  created_by: String,
  date: String,
  votes: Number,
  link: String,
});

const Election = mongoose.model('Election', electionSchema);

// Routes
app.post('/api/user', async (req, res) => {
  const { username, uid } = req.body;

  try {
    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this UID already exists' });
    }

    const newUser = new User({
      username,
      uid,
    });
    await newUser.save();
    res.status(201).json({ message: 'User data saved successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save user data', error: error.message });
  }
});

// GET request to fetch elections
app.get('/api/elections', async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch elections', error: error.message });
  }
});

// POST request to create a new election
app.post('/api/elections', async (req, res) => {
  const { title, date, description, created_by, link } = req.body;

  try {
    const newElection = new Election({
      title,
      date,
      description,
      created_by,
      votes: 0,
      link,
    });

    await newElection.save();
    res.status(201).json({ message: 'Election created successfully', election: newElection });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create election', error: error.message });
  }
});

// POST request to vote for an election
app.post('/api/vote', async (req, res) => {
  const { title } = req.body;

  try {
    const election = await Election.findOne({ title });

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    election.votes += 1;
    await election.save();

    res.status(200).json({ message: 'Vote recorded successfully', election });
  } catch (error) {
    res.status(500).json({ message: 'Failed to vote', error: error.message });
  }
});

// DELETE request to delete a specific election
app.delete('/api/elections/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedElection = await Election.findByIdAndDelete(id);

    if (!deletedElection) {
      return res.status(404).json({ message: 'Election not found' });
    }

    res.status(200).json({ message: 'Election deleted successfully', election: deletedElection });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete election', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
