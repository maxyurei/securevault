import { useState } from 'react';
import { login } from '../services/api';

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await login(email, password);  
            localStorage.setItem('token', response.token);
            onLoginSuccess();  
        } catch (error) {
            setError(error.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);  
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            
            <div>
                <label>Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default LoginForm;