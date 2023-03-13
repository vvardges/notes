import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Draggable from 'react-draggable';
import { FaTrashAlt } from 'react-icons/fa';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (x, y, width, height) => {
    const newNote = {
      id: uuidv4(),
      x,
      y,
      width,
      height,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleDrag = (e, { x, y }, note) => {
      const newNotes = notes.map((n) =>
          n.id === note.id ? { ...n, x, y } : n
      );
      setNotes(newNotes);
  }

  const handleStop = (e, x, id) => {
      if (x > window.innerWidth / 2) {
          deleteNote(id)
      }
  }

  return (
      <div className='App'>
        <button onClick={() => addNote(100, 100, 200, 150)}>Add Note</button>
        {notes.map((note) => (
            <Draggable
                key={note.id}
                position={{ x: note.x, y: note.y }}
                onDrag={(e, {x, y}) => handleDrag(e, {x,y}, note)}
                onStop={(e, {x, y}) => handleStop(e, x, note.id)}
            >
              <div
                  className='note'
                  style={{ width: note.width, height: note.height }}
              >
                <div className='note-header'>
                  <div className='note-title'>Note {note.id}</div>
                  <div className='note-delete'>
                    <FaTrashAlt
                        onClick={() => deleteNote(note.id)}
                        className='trash-icon'
                    />
                  </div>
                </div>
                <div className='note-body'>This is the body of the note.</div>
              </div>
            </Draggable>
        ))}
        <div className='trash-zone'>
          Drag notes here to delete them
        </div>
      </div>
  );
}

export default App;
