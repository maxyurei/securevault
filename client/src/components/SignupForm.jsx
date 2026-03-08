import { useState } from "react";
import { signup } from "../services/api";

function SignUpForm({ onSignUpSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await signup(email, password);
            localStorage.setItem("token", response.token);
            onSignUpSuccess();
        } catch ( error ) {
            setError(error.response?.data?.error || "SignUp failed");
        } finally {
            setLoading(false);
        }

    };

    return (
<div className="card max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">SignUp to SecureVault</h2>

    {error && (
        <div className='mb-4 p-4 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-600'>{error}</p>
        </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Email Address:</label>
            <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
            />
        </div>
        
        <div>
            <label className="block font-medium text-gray-900 text-sm mb-1">Password:</label>
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
            />
        </div>
        
        <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Signing in...' : 'Sign In'}
        </button>
    </form>
</div>
);
}

export default SignUpForm;