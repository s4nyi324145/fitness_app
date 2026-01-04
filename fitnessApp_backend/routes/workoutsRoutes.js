import  {getWorkouts, getWorkoutById, createWorkout, editWorkout, deleteWorkout, getWorkoutThisWeek} from '../controllers/workoutsController.js';
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.get("/",authMiddleware ,getWorkouts);
router.get("/week", authMiddleware, getWorkoutThisWeek)
router.get("/:id",authMiddleware ,getWorkoutById);
router.post("/", authMiddleware,createWorkout);
router.put("/:id", authMiddleware,editWorkout);
router.delete("/:id",authMiddleware ,deleteWorkout);


export default router;