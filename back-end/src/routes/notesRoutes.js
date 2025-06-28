import express from "express"
import { getAllNote, createNote, updateNote, deleteNote, getNotesById} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNote)

router.get("/:id", getNotesById)

router.post("/", createNote)

router.put("/:id", updateNote )

router.delete("/:id", deleteNote)

export default router;