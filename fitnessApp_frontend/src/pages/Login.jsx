import '../style/register.css'
import { useState } from 'react'
import {Flame, Lock, Mail,  EyeOff, Eye,ArrowRight, Loader } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useToast } from '../context/toastContext.jsx'
import {useAuth} from '../context/autContext.jsx'
import api from '../api/api.js'

export default function Login() {

  const [hidePassword, setHidePassword] = useState(true);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const {showError, showSuccess} = useToast();
  const {login} = useAuth();
  const navigation = useNavigate()


  const handleSubmit2 = async (e) => {
        //console.log('Submitting login form with:', { email, password });
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await login(email, password);
            //console.log('Login response:', response);
            showSuccess(response.data.message || 'Login successful!');
            setTimeout(() => {
            navigation('/dashboard');
            }, 3000);
        } catch (error) {
            showError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
       <div className="register-container">

       
        
        <div className="register-div">
            <h1><Flame size={32} color="#ff6b35" /> FitTracker</h1>
            <p className='subtitle'>Welcome back!</p>
            <hr />
            
            <form onSubmit={(e) => handleSubmit2(e)}>
                
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
                    Logging in... <Loader className="loader-icon" size={18} />
                  </span>
                )}
                <button type="submit" disabled={loading} className="register-btn">Log in<ArrowRight size={18} /></button>
            </form>
            <p className="login-link">Don't have an account?  <Link to={'/'}>Get started</Link></p>
        </div>

    </div>
    
    </>
  )
}