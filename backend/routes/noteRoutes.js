const express = require("express");
const router = express.Router();

const {
    createNote,
    getNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById,
} = require("../controllers/noteController");

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNoteById);
router.put("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);

module.exports = router;
