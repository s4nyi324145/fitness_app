import express from 'express';
import {userLogin, userRegister, userInformation} from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();
/*
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { message: "Too many login attempts from this IP, please try again after 15 minutes" }
});

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many registration attempts from this IP, please try again after 15 minutes" }
})

*/

router.post('/register' ,userRegister);
router.post('/login' ,userLogin);
router.get('/me', authMiddleware, userInformation);

export default router;