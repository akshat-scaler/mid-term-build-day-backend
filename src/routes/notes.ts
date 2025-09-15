import { Router } from "express";
import {
  changeNote,
  createNotes,
  deleteNote,
  getNote,
} from "../controllers/notes.controller.js";
import { authMiddleware } from "../middleware/index.js";
const notesRouter = Router();
notesRouter.use(authMiddleware);
notesRouter.get("/", getNote);
notesRouter.post("/", createNotes);
notesRouter.patch("/:id", changeNote);
notesRouter.delete("/:id", deleteNote);
export default notesRouter;
