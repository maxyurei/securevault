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
        <div className='card max-w-md mx-auto'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
                Login to SecureVault
            </h2>

            {error && (
                <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
                    <p className='text-sm text-red-600'>{error}</p>
                </div>
            )}

        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block text-sm font-medium text-gray-900 mb-1'>Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='input-field'
                />
            </div>
            
            <div>
                <label className='block text-sm font-medium text-gray-900 mb-1' >Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='input-field'
                />
            </div>
            
            <button type="submit" disabled={loading} className='btn-primary cursor-pointer'>
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    </div>
    );
}

export default LoginForm;