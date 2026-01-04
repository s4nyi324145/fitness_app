import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userRegister = async (req, res) => {  
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    try {
        const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        const [existingUser2] = await pool.query("SELECT id FROM users WHERE name = ?", [name]);
        if (existingUser2.length > 0) {
            return res.status(400).json({ message: 'Name already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const [rows] = await pool.query("SELECT id, password_hash FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({id: user.id, name: user.name}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const userInformation = async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await pool.query("SELECT u.id, u.name, u.email, up.current_goal, up.experience_level, up.workout_days_per_week FROM users u LEFT JOIN user_profiles up ON u.id = up.user_id WHERE u.id = ?", [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
       res.status(200).json({
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
            profile: {
                current_goal: rows[0].current_goal || null,
                experience_level: rows[0].experience_level || null,
                workout_days_per_week: rows[0].workout_days_per_week || null
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
export { userRegister, userLogin, userInformation };