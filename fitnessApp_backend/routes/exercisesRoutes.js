import {allExercises, getExerciseById, createCustomExercises, editExercise, deleteExercise} from "../controllers/exercisesController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware ,allExercises);
router.get("/:id", authMiddleware,getExerciseById);
router.post("/",authMiddleware ,createCustomExercises);
router.put("/:id",authMiddleware ,editExercise);
router.delete("/:id",authMiddleware ,deleteExercise);

export default router;
