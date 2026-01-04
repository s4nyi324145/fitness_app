import express from 'express';
import { addSetToExercise, editSet, deleteSet } from '../controllers/workoutSetsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();


router.post('/workout-exercises/:workoutExerciseId/sets', authMiddleware ,addSetToExercise);
router.put('/sets/:id',authMiddleware , editSet);
router.delete('/sets/:id', authMiddleware ,deleteSet);

export default router;