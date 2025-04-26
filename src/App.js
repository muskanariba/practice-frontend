const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create an express app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development purposes
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err));

// Note Model
const Note = mongoose.model('Note', new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}));

// Routes for Notes API

// Fetch all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

// Add a new note
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ message: 'Error adding note' });
  }
});

// Delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

// Export the app for Vercel
module.exports = app;
