import { useEffect, useState } from "react";
import "./note.css";

export default function NoteApp() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState([]);

    /* 🔹 Load notes from localStorage */
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);

    /* 🔹 Save notes to localStorage */
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (!title.trim() || !content.trim()) {
            alert("Please fill all fields");
            return;
        }

        setNotes([
            ...notes,
            {
                id: Date.now(),
                title: title.trim(),
                content: content.trim(),
            },
        ]);

        setTitle("");
        setContent("");
    };

    const editNote = (id) => {
        const note = notes.find((n) => n.id === id);
        if (!note) return;

        const newTitle = prompt("Edit title", note.title);
        const newContent = prompt("Edit content", note.content);

        if (!newTitle || !newContent) return;

        setNotes(
            notes.map((n) =>
                n.id === id
                    ? {
                        ...n,
                        title: newTitle.trim(),
                        content: newContent.trim(),
                    }
                    : n
            )
        );
    };

    const deleteNote = (id) => {
        if (!window.confirm("Delete this note?")) return;
        setNotes(notes.filter((n) => n.id !== id));
    };

    return (
        <div className="note-page">
            {/* FORM */}
            <div className="note-form-card">
                <h3>Add Note</h3>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Content"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button className="add-btn" onClick={addNote}>
                    Add Note
                </button>
            </div>

            {/* TABLE */}
            <div className="note-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {notes.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty">
                                    No notes added yet
                                </td>
                            </tr>
                        ) : (
                            notes.map((note, index) => (
                                <tr key={note.id}>
                                    <td>{index + 1}</td>
                                    <td>{note.title}</td>
                                    <td>{note.content}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                editNote(note.id)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                deleteNote(note.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
