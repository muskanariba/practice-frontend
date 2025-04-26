import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    const res = await axios.get('https://practice-backend-kappa.vercel.app/api/notes');
    setNotes(res.data);
  };

  const addNote = async () => {
    if (form.title && form.content) {
      await axios.post('https://practice-backend-kappa.vercel.app/api/notes', form);
      setForm({ title: '', content: '' });
      fetchNotes();
    }
  };

  const deleteNote = async (id) => {
    await axios.delete(`https://practice-backend-kappa.vercel.app/api/notes/${id}`);
    fetchNotes();
  };

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
