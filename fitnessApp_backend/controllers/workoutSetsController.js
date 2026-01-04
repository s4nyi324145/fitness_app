import pool from '../config/db.js';

// Set hozzáadása egy gyakorlathoz
const addSetToExercise = async (req, res) => {
    const { workoutExerciseId } = req.params;  
    const user_id = req.user.id;
    const { set_number, reps, weight_kg, notes } = req.body;
    
    if (!set_number || !reps || weight_kg === undefined) {
        return res.status(400).json({ message: 'set_number, reps, and weight_kg are required' });
    }
    
    try {
        // Check ownership
        const [check] = await pool.query(`
            SELECT we.id 
            FROM workout_exercises we
            JOIN workouts w ON we.workout_id = w.id
            WHERE we.id = ? AND w.user_id = ?
        `, [workoutExerciseId, user_id]);
        
        if (check.length === 0) {
            return res.status(404).json({ message: 'Exercise not found in workout or no permission' });
        }
        
        const [result] = await pool.query(
            "INSERT INTO workout_sets (workout_exercise_id, set_number, reps, weight_kg, notes) VALUES (?, ?, ?, ?, ?)",
            [workoutExerciseId, set_number, reps, weight_kg, notes || null]
        );
        
        res.status(201).json({ 
            message: 'Set added', 
            setId: result.insertId 
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Set szerkesztése (ez MARAD ugyanaz, csak név változás)
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

// Set törlése (ez is MARAD, csak security check változik)
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