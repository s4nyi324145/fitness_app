import pool from '../config/db.js';


const addExerciseToWorkout = async (req, res) => {
    const { workoutId } = req.params;
    const user_id = req.user.id;
    const {addingExercises} = req.body;
    console.log(addingExercises)
    
    if (!addingExercises) return res.status(400).json({ message: 'Exercise ID is required' });
    
    try {
        
        const [workoutCheck] = await pool.query(
            "SELECT id FROM workouts WHERE id = ? AND user_id = ?",
            [workoutId, user_id]
        );
        if (workoutCheck.length === 0) {
            return res.status(404).json({ message: 'Workout not found or no permission' });
        }
        
       
     
      const values = addingExercises.map(ex => [workoutId, ex]);
        
   
      const [result] = await pool.query(
          "INSERT INTO workout_exercises (workout_id, exercise_id) VALUES ?",
          [values]
      );
        
        res.status(201).json({ 
            message: 'Exercise(s) added to workout', 
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
        // Ellenőrzés
        const [workoutCheck] = await pool.query(
            "SELECT id FROM workouts WHERE id = ? AND user_id = ?",
            [workoutId, user_id]
        );
        if (workoutCheck.length === 0) {
            return res.status(404).json({ message: 'Workout not found or no permission' });
        }
        
        // Lekérdezés (ahogy van)
        const [exercises] = await pool.query(`
            SELECT 
                we.id as workout_exercise_id,
                e.id as exercise_id,
                e.name as exercise_name,
                e.category,
                e.equipment,
                ws.id as set_id,
                ws.set_number,
                ws.reps,
                ws.weight_kg,
                ws.notes,
                ws.type
            FROM workout_exercises we
            JOIN exercises e ON we.exercise_id = e.id
            LEFT JOIN workout_sets ws ON ws.workout_exercise_id = we.id
            WHERE we.workout_id = ?
            ORDER BY we.id, ws.set_number
        `, [workoutId]);
        
        // Csoportosítás gyakorlatonként
        const grouped = exercises.reduce((acc, row) => {
            const existingExercise = acc.find(ex => ex.workout_exercise_id === row.workout_exercise_id);
            
            if (existingExercise) {
                // Ha van set_id, add hozzá a sets-hez
                if (row.set_id) {
                    existingExercise.sets.push({
                        set_id: row.set_id,
                        set_number: row.set_number,
                        reps: row.reps,
                        weight_kg: row.weight_kg,
                        notes: row.notes,
                        type: row.type
                    });
                }
            } else {
                // Új gyakorlat
                acc.push({
                    workout_exercise_id: row.workout_exercise_id,
                    exercise_id: row.exercise_id,
                    exercise_name: row.exercise_name,
                    category: row.category,
                    equipment: row.equipment,
                    sets: row.set_id ? [{
                        set_id: row.set_id,
                        set_number: row.set_number,
                        reps: row.reps,
                        weight_kg: row.weight_kg,
                        notes: row.notes,
                        type: row.type
                    }] : []
                });
            }
            
            return acc;
        }, []);
        
        res.status(200).json(grouped);
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const removeExerciseFromWorkout = async (req, res) => {
    const { workoutId, exerciseId } = req.params; 
    const user_id = req.user.id;
    
    try {
       
        const [check] = await pool.query(`
            SELECT we.id 
            FROM workout_exercises we
            JOIN workouts w ON we.workout_id = w.id
            WHERE we.workout_id = ? 
              AND we.exercise_id = ? 
              AND w.user_id = ?
        `, [workoutId, exerciseId, user_id]);
        
        if (check.length === 0) {
            return res.status(404).json({ message: 'Exercise not found or no permission' });
        }
        
      
        await pool.query(
            "DELETE FROM workout_exercises WHERE workout_id = ? AND exercise_id = ?", 
            [workoutId, exerciseId]
        );
        
        res.status(200).json({ message: 'Exercise removed from workout' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { addExerciseToWorkout, getWorkoutExercises, removeExerciseFromWorkout };