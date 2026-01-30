import express from 'express';
import { addExerciseToWorkout, getWorkoutExercises, removeExerciseFromWorkout } from '../controllers/workoutExercisesController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/workouts/:workoutId/exercises',authMiddleware , addExerciseToWorkout);
router.get('/workouts/:workoutId/exercises',authMiddleware , getWorkoutExercises);
router.delete('/workouts/:workoutId/exercises/:exerciseId',authMiddleware, removeExerciseFromWorkout);

export default router;