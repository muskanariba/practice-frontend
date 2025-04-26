import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  // Fetch notes from the backend
  const fetchNotes = async () => {
    try {
      const res = await axios.get('https://practice-backend-kappa.vercel.app/api/notes');
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a new note
  const addNote = async () => {
    if (form.title && form.content) {
      try {
        await axios.post('https://practice-backend-kappa.vercel.app/api/notes', form);
        setForm({ title: '', content: '' });
        fetchNotes();
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  // Delete a note by ID
  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://practice-backend-kappa.vercel.app/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app-container">
      <h2>📝 Notes App</h2>
      <div className="note-form">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      {notes.map(note => (
        <div key={note._id} className="note">
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
