// Navbar.jsx
import { useState } from 'react';
import { 
    LayoutDashboard, 
    Dumbbell, 
    ClipboardList, 
    TrendingUp, 
    Bot, 
    User, 
    LogOut 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/autContext';
import '../style/nav.css';

export default function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const navItems = [
        { icon: LayoutDashboard, title: 'Dashboard', path: '/dashboard' },
        { icon: Dumbbell, title: 'Exercises', path: '/exercises' },
        { icon: ClipboardList, title: 'Workouts', path: '/workouts' },
        { icon: TrendingUp, title: 'Progress', path: '/progress' },
        { icon: Bot, title: 'AI Coach', path: '/ai-coach' },
        { icon: User, title: 'Profile', path: '/profile' },
    ];
    
    return (
        <nav 
            className={`sidebar ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <ul className="nav-links">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.path}>
                            <Link to={item.path} className="nav-item">
                                <Icon size={20} className="nav-icon" />
                                <span className="nav-title">{item.title}</span>
                            </Link>
                        </li>
                    );
                })}
                
                <li>
                    <button onClick={handleLogout} className="nav-item logout-btn">
                        <LogOut size={20} className="nav-icon" />
                        <span className="nav-title">Log out</span>
                    </button>
                </li>
                {/*console.log(user)*/}
            </ul>
        </nav>
    );
}