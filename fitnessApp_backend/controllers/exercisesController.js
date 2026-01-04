import pool from '../config/db.js';

const allExercises = async (req, res) => {
    const userId = req.user.id; 
    
    try {
        const [rows] = await pool.query(
            'SELECT * FROM exercises WHERE is_custom = 0 OR (is_custom = 1 AND user_id = ?)',
            [userId]
        );
        
        if(rows.length === 0) return res.status(404).json({message: 'No exercises found'});
        res.status(200).json(rows);
        
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});        
    }
}

const getExerciseById = async (req,res) =>{
    const {id} = req.params;
    if(!id) return res.status(400).json({message: 'Exercise ID is required'});
    try {
        const [rows] = await pool.query('SELECT * FROM exercises WHERE id = ?', [id]);
        if(rows.length === 0) return  res.status(404).json({message: 'Exercise not found'});
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const createCustomExercises = async (req, res) => {
    const userId = req.user.id; 
    const {name, category, equipment, description} = req.body;
    
    if(!name || !category || !equipment){
        return res.status(400).json({message: 'Name, category and equipment are required'});
    }

    const requiredCategories = ["chest", "back", "legs", "arms", "shoulders", "core", "cardio"]
    if(!requiredCategories.includes(category.toLowerCase())){
        return res.status(400).json({message: `Category must be one of the following: ${requiredCategories.join(', ')}`});
    }

    const requiredEquipments = ["dumbbell", "barbell", "machine", "bodyweight", "cable"]
    if(!requiredEquipments.includes(equipment.toLowerCase())){
        return res.status(400).json({message: `Equipment must be one of the following: ${requiredEquipments.join(', ')}`});
    }

    try {
         const [result] = await pool.query(
             "INSERT INTO exercises (name, category, equipment, description, user_id, is_custom) VALUES (?, ?, ?, ?, ?,1)",
             [name, category, equipment, description || null, userId] 
         );
         res.status(201).json({message: 'Custom exercise created', exerciseId: result.insertId});
    
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}
const editExercise = async (req,res) =>{
    const {id} = req.params;
    const userId = req.user.id; 
    const {name, category, equipment, description} = req.body; 
    
    if(!id) return res.status(400).json({message: 'Exercise ID is required'});

    if(category){
        const requiredCategories = ["chest", "back", "legs", "arms", "shoulders", "core","cardio"]
        if(!requiredCategories.includes(category.toLowerCase())){
            return res.status(400).json({message: `Category must be one of the following: ${requiredCategories.join(', ')}`});
        }
    }

    if(equipment){
        const requiredEquipments = ["dumbbell", "barbell", "machine", "bodyweight", "cable"]
        if(!requiredEquipments.includes(equipment.toLowerCase())){
            return res.status(400).json({message: `Equipment must be one of the following: ${requiredEquipments.join(', ')}`});
        }
    }

    try {
     
        const [result] = await pool.query(
            "UPDATE exercises SET name = COALESCE(?, name), category = COALESCE(?, category), equipment = COALESCE(?, equipment), description = COALESCE(?, description) WHERE id = ? AND user_id = ?",
            [name, category, equipment, description, id, userId] 
        );
        
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Exercise not found or you do not have permission'});
        }
        res.status(200).json({message: 'Exercise updated successfully'});

    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const deleteExercise = async (req,res) =>{
    const {id} = req.params;
    const userId = req.user.id; 
    
    if(!id) return res.status(400).json({message: 'Exercise ID is required'});
    
    try {
       
        const [result] = await pool.query(
            "DELETE FROM exercises WHERE id = ? AND user_id = ?",
            [id, userId] 
        );
        
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Exercise not found or you do not have permission'});
        }
        res.status(200).json({message: 'Exercise deleted successfully'});
        
    } catch (error) {
         res.status(500).json({message: "Server error", error: error.message})
    }
}

export {allExercises, getExerciseById, createCustomExercises, editExercise, deleteExercise};
