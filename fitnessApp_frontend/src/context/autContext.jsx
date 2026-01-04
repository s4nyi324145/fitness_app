import  { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);
    
    const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        console.log(response)
        localStorage.setItem('token', response.data.token);
        
        const userResponse = await api.get('/auth/me');
        setUser(userResponse.data);

        return response;
    };
    
    const register = async (name, email, password) => {
        const response = await api.post('/auth/register', { name, email, password });
        console.log('Registration response:', response);
        return response;
    };
    
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/login';
    };
    
    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);