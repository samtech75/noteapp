const Note = require("../models/Note");

/* ================= CREATE NOTE ================= */
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const note = await Note.create({ title, content });

        res.status(201).json({
            message: "Note created successfully",
            note,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= GET ALL NOTES ================= */
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= GET NOTE BY ID ================= */
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= UPDATE NOTE BY ID ================= */
exports.updateNoteById = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            updatedNote,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* ================= DELETE NOTE BY ID ================= */
exports.deleteNoteById = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
