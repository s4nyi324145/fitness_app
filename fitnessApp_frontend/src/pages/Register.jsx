import '../style/register.css'
import { useState } from 'react'
import {Flame, Lock, Mail,  EyeOff, Eye, User,ArrowRight, Loader } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../context/toastContext.jsx'
import {useAuth} from '../context/autContext.jsx'

import api from '../api/api.js'


export default function Register() {

  const [hidePassword, setHidePassword] = useState(true);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const {showError, showSuccess} = useToast();
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await api.post('/auth/register', {
            name,
            email,
            password
        });
   
        showSuccess(response.data.message || 'Registration successful! You can now log in.');
        setTimeout(() => {
            navigation('/login');
        }, 1500);
    }
    catch (error) {
        console.error('Registration error:', error);
        showError(error.response.data.message || 'Registration failed. Please try again.');
    }
    finally {
        setLoading(false);
    }
  }

  const pswStrength = () => {
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-/]/.test(password);
    if (password.length >= 8 && hasNumber && hasSpecialChar) {
        return 'Strong';
    }
    if (password.length >= 6 && hasNumber) {
        return 'Medium';
    }
    if (password.length >= 4) {
        return 'Weak';
    }
    return 'Very Weak';
    
  }

 
    
  return (<>
  
    <div className="register-container">

       
        
        <div className="register-div">
            <h1><Flame size={32} color="#ff6b35" /> FitTracker</h1>
            <p className='subtitle'>Start Your Fitness Journey</p>
            <hr />
            <div className="password-strength">
                {password && (<>
                    <span>Password Strength: </span>
                    <span className={`strength-${pswStrength().toLowerCase().replace(' ','-')}`}>{pswStrength()}</span>
                </>)}
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-group">
                    <User size={20} color={'#ff6b35'} />
                    <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                </div>
                <div className="input-group">
                    <Mail size={20} color={'#ff6b35'} />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                </div>
                <div className="input-group">
                    <Lock size={20} color={'#ff6b35'} />
                    <input required type={hidePassword? 'password' : 'text'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <span className="password-toggle" onClick={() => setHidePassword(!hidePassword)}>
                        {hidePassword ? <EyeOff size={20} color={'#ff6b35'} /> : <Eye size={20} color={'#ff6b35'} />}
                    </span>
                </div>
                {loading && (
                  <span className="creating-account">
                    Creating account... <Loader className="loader-icon" size={18} />
                  </span>
                )}
                <button type="submit" disabled={pswStrength() === "Very Weak" || pswStrength() === "Weak" || loading} className="register-btn">Get Started <ArrowRight size={18} /></button>
            </form>
            <p className="login-link">Already have an account? <Link to={'/login'}>Login</Link></p>
        </div>

    </div>
  
  </>)
}