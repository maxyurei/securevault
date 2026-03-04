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
    <form onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        
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
            {loading ? 'Logging in...' : 'Sign Up'}
        </button>
    </form>
);
}

export default SignUpForm;