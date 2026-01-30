import pool from '../config/db.js';


const addSetToExercise = async (req, res) => {
    const { workoutExerciseId } = req.params;  
    const user_id = req.user.id;
    const { sets } = req.body; 
    
    console.log('Updating sets for exercise:', workoutExerciseId, sets);
    
    // Validáció
    if (!sets || !Array.isArray(sets)) {
        return res.status(400).json({ message: 'sets array is required' });
    }
    
    // Ellenőrizd minden set-et
    for (const set of sets) {
        if (!set.set_number || !set.reps) {
            return res.status(400).json({ 
                message: 'set_number and reps are required for all sets' 
            });
        }
        
        if (set.weight_kg !== undefined && set.weight_kg < 0) {
            return res.status(400).json({ 
                message: 'weight_kg cannot be negative' 
            });
        }
    }
    
    try {
        // Ellenőrizd, hogy a workout_exercise létezik és a useré
        const [check] = await pool.query(`
            SELECT we.id 
            FROM workout_exercises we
            JOIN workouts w ON we.workout_id = w.id
            WHERE we.id = ? AND w.user_id = ?
        `, [workoutExerciseId, user_id]);
        
        if (check.length === 0) {
            return res.status(404).json({ 
                message: 'Exercise not found in workout or no permission' 
            });
        }
        
        // 1. TÖRÖLD az összes régi set-et
        await pool.query(
            "DELETE FROM workout_sets WHERE workout_exercise_id = ?",
            [workoutExerciseId]
        );


        
        // 2. Ha vannak új set-ek, INSERT-eld őket
        if (sets.length > 0) {
            const values = sets.map(set => [
                workoutExerciseId,
                set.set_number,
                set.reps,
                set.weight_kg || null,
                set.notes || null,
                set.type || "working"
            ]);
            
            await pool.query(
                "INSERT INTO workout_sets (workout_exercise_id, set_number, reps, weight_kg, notes, type) VALUES ?",
                [values]
            );
        }
        
        res.status(200).json({ 
            message: `Sets updated successfully. ${sets.length} set(s) saved.`
        });
        
    } catch (error) {
        console.error('Error updating sets:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
};

const editSet = async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;
    const {reps, weight_kg, notes} = req.body;
    
    if(!id) return res.status(400).json({message: 'Set ID is required'});
    
    try {
        // Security check
        const [check] = await pool.query(`
            SELECT ws.id FROM workout_sets ws 
            JOIN workout_exercises we ON ws.workout_exercise_id = we.id
            JOIN workouts w ON we.workout_id = w.id 
            WHERE ws.id = ? AND w.user_id = ?
        `, [id, user_id]);
        
        if(check.length === 0) {
            return res.status(404).json({message: 'Set not found or no permission'});
        }
        
        const [result] = await pool.query(
            "UPDATE workout_sets SET reps = COALESCE(?, reps), weight_kg = COALESCE(?, weight_kg), notes = COALESCE(?, notes) WHERE id = ?",
            [reps, weight_kg, notes, id]
        );
        
        res.status(200).json({message: 'Set updated successfully'});

    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};


const deleteSet = async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;
    
    if(!id) return res.status(400).json({message: 'Set ID is required'});
    
    try {
        // Security check
        const [check] = await pool.query(`
            SELECT ws.id FROM workout_sets ws 
            JOIN workout_exercises we ON ws.workout_exercise_id = we.id
            JOIN workouts w ON we.workout_id = w.id 
            WHERE ws.id = ? AND w.user_id = ?
        `, [id, user_id]);
        
        if(check.length === 0) {
            return res.status(404).json({message: 'Set not found or no permission'});
        }
        
        await pool.query("DELETE FROM workout_sets WHERE id = ?", [id]);
        
        res.status(200).json({message: 'Set deleted successfully'});
    
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

export { addSetToExercise, editSet, deleteSet };