import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
       'Content-Type': 'application/json',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjI5OTBmMGJlZGY1NzI2MmViNTRjIn0sImlhdCI6MTcwODg2MTg4N30.1q5sUU21pb2b8QeFtMybPwtUqmC1j6km00YHAGLrHjc",
      }
    });
    const json =await response.json();
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
     // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjI5OTBmMGJlZGY1NzI2MmViNTRjIn0sImlhdCI6MTcwODg2MTg4N30.1q5sUU21pb2b8QeFtMybPwtUqmC1j6km00YHAGLrHjc",
      },
      body: JSON.stringify({title, description, tag})
  });
  
    // client side
    console.log("Adding a new note");
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0,
    };
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    //  API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
       'Content-Type': 'application/json',
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjI5OTBmMGJlZGY1NzI2MmViNTRjIn0sImlhdCI6MTcwODg2MTg4N30.1q5sUU21pb2b8QeFtMybPwtUqmC1j6km00YHAGLrHjc",
      }
    });
    const json =await response.json();
    console.log(json)

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {

    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYjI5OTBmMGJlZGY1NzI2MmViNTRjIn0sImlhdCI6MTcwODg2MTg4N30.1q5sUU21pb2b8QeFtMybPwtUqmC1j6km00YHAGLrHjc",
      },
      body: JSON.stringify({title, description, tag}),
    });
    // eslint-disable-next-line
    const json = await response.json();

    // client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
