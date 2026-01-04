import pool from "../config/db.js";

const getWorkouts = async (req, res) => {
    const user_id = req.user.id;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM workouts WHERE user_id = ?",
            [user_id]
        );
        if(rows.length === 0) return res.status(404).json({message: "No workouts found for this user"});
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
};

const getWorkoutById = async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;
    if(!id) return res.status(400).json({message: 'Workout ID is required'});
    try {
        const [rows] = await pool.query(
            "SELECT * FROM workouts WHERE id = ? AND user_id = ?",
            [id, user_id]
        );
        if(rows.length === 0) return  res.status(404).json({message: 'Workout not found'});
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const createWorkout = async (req, res) => {
    const user_id = req.user.id;
    const {date, notes, duration_minutes,name} = req.body;
    if(!date || !duration_minutes || !name){
        return res.status(400).json({message: 'Date and duration_minutes and name are required'});
    }
    try {
         const [result] = await pool.query(
             "INSERT INTO workouts (user_id, date, notes, duration_minutes, created_at, name) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(),?)",
             [user_id, date, notes || null, duration_minutes,name] 
         );
         res.status(201).json({message: 'Workout created', workoutId: result.insertId});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

const editWorkout = async (req,res) =>{
    const {id} = req.params;
    const user_id = req.user.id;
    const {date, notes, duration_minutes,name} = req.body;
    try {
         const [result] = await pool.query(
             "UPDATE workouts SET date = COALESCE(?, date), notes = COALESCE(?, notes), duration_minutes = COALESCE(?, duration_minutes), name = COALESCE(?, name) WHERE id = ? AND user_id = ?",
             [date, notes, duration_minutes, name,id, user_id] 
         );
            if(result.affectedRows === 0){
                return res.status(404).json({message: 'Workout not found'});
            }
            res.status(200).json({message: 'Workout updated'});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

const deleteWorkout = async (req,res) =>{
    const {id} = req.params;
    const user_id = req.user.id;
    if(!id) return res.status(400).json({message: 'Workout ID is required'});
    try {
        const [result] = await pool.query("DELETE FROM workouts WHERE id = ? AND user_id = ?", [id, user_id]);
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Workout not found'});
        }
        res.status(200).json({message: 'Workout deleted successfully'});
    } catch (error) {
         res.status(500).json({message: "Server error", error: error.message})
    }
}

const getWorkoutThisWeek = async (req, res) => {
    const user_id = req.user.id;

    try {
        const today = new Date();

        
        const firstDayOfWeek = new Date(today);
        const day = today.getDay() === 0 ? 6 : today.getDay() - 1;
        firstDayOfWeek.setDate(today.getDate() - day);
        firstDayOfWeek.setHours(0, 0, 0, 0);

   
        const nextMonday = new Date(firstDayOfWeek);
        nextMonday.setDate(firstDayOfWeek.getDate() + 7);

   
        const startDate = firstDayOfWeek.toLocaleDateString('en-CA');
        const endDate = nextMonday.toLocaleDateString('en-CA');

        console.log(startDate, endDate);
        console.log(user_id)

        const [rows] = await pool.query(
            `SELECT *
             FROM workouts
             WHERE user_id = ?
               AND date >= ?
               AND date < ?
             ORDER BY date DESC`,
            [user_id, startDate, endDate]
        );

        res.status(200).json({
            count: rows.length,
            workouts: rows
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


export  {getWorkouts, getWorkoutById, createWorkout, editWorkout, deleteWorkout, getWorkoutThisWeek};