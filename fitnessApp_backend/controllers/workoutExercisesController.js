import pool from '../config/db.js';


const addExerciseToWorkout = async (req, res) => {
    const { workoutId } = req.params;
    const user_id = req.user.id;
    const { exercise_id } = req.body;
    
    if (!exercise_id) return res.status(400).json({ message: 'Exercise ID is required' });
    
    try {
        
        const [workoutCheck] = await pool.query(
            "SELECT id FROM workouts WHERE id = ? AND user_id = ?",
            [workoutId, user_id]
        );
        if (workoutCheck.length === 0) {
            return res.status(404).json({ message: 'Workout not found or no permission' });
        }
        
       
        const [result] = await pool.query(
            "INSERT INTO workout_exercises (workout_id, exercise_id) VALUES (?, ?)",
            [workoutId, exercise_id]
        );
        
        res.status(201).json({ 
            message: 'Exercise added to workout', 
            workoutExerciseId: result.insertId 
        });
        
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Exercise already added to this workout' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getWorkoutExercises = async (req, res) => {
    const { workoutId } = req.params;
    const user_id = req.user.id;
    
    try {
        
        const [workoutCheck] = await pool.query(
            "SELECT id FROM workouts WHERE id = ? AND user_id = ?",
            [workoutId, user_id]
        );
        if (workoutCheck.length === 0) {
            return res.status(404).json({ message: 'Workout not found or no permission' });
        }
      
        const [exercises] = await pool.query(`
            SELECT 
                we.id as workout_exercise_id,
                e.id as exercise_id,
                e.name as exercise_name,
                e.category,
                ws.id as set_id,
                ws.set_number,
                ws.reps,
                ws.weight_kg,
                ws.notes
            FROM workout_exercises we
            JOIN exercises e ON we.exercise_id = e.id
            LEFT JOIN workout_sets ws ON ws.workout_exercise_id = we.id
            WHERE we.workout_id = ?
            ORDER BY we.id, ws.set_number
        `, [workoutId]);
        
        
        res.status(200).json(exercises);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const removeExerciseFromWorkout = async (req, res) => {
    const { workoutExerciseId } = req.params;
    const user_id = req.user.id;
    
    try {
     
        const [check] = await pool.query(`
            SELECT we.id 
            FROM workout_exercises we
            JOIN workouts w ON we.workout_id = w.id
            WHERE we.id = ? AND w.user_id = ?
        `, [workoutExerciseId, user_id]);
        
        if (check.length === 0) {
            return res.status(404).json({ message: 'Exercise not found or no permission' });
        }
        
      
        await pool.query("DELETE FROM workout_exercises WHERE id = ?", [workoutExerciseId]);
        
        res.status(200).json({ message: 'Exercise removed from workout' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { addExerciseToWorkout, getWorkoutExercises, removeExerciseFromWorkout };