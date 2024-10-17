import express from 'express';
import { createTask, getTasks, editTask, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middleware/jwt.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.put('/:id', protect, editTask);
router.delete('/:id', protect, deleteTask);

export default router;
