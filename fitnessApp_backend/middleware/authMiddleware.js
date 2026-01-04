import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [rows] = await pool.query("SELECT id, name, email FROM users WHERE id = ?", [decoded.id]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
}

export default authMiddleware;