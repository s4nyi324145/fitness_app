import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import exercisesRoutes from './routes/exercisesRoutes.js';
import workoutsRoutes from './routes/workoutsRoutes.js';
import workoutExercisesRoutes from './routes/workoutExercisesRoutes.js';
import workoutSetsRoutes from './routes/workoutSetsRoutes.js';
import authRoutes from './routes/authRoutes.js';



const app = express();
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use('/api/exercises', exercisesRoutes);
app.use('/api/workouts', workoutsRoutes);
app.use('/api', workoutExercisesRoutes);
app.use('/api', workoutSetsRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running: http://localhost:${process.env.PORT || 3000}`);
});


