import express from "express";
import {  getNotes, getNotesbyId, createNotes, updateNotes, deleteNotes } from "../controller/NoteController.js";
import { verifyToken } from "../middleware/verifytoken.js";

const router = express.Router();

router.get('/Notes', verifyToken, getNotes);
router.get('/Notes/:id', verifyToken, getNotesbyId);
router.post('/Notes', verifyToken, createNotes);
router.patch('/Notes/:id', verifyToken, updateNotes);
router.delete('/Notes/:id', verifyToken, deleteNotes);

export default router;