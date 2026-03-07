import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";
import Dashboard from "./pages/Dashboard";

function App() {

  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = () => {
    console.log('Authentication succesful!');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  if (isAuthenticated) {
    return <Dashboard  onLogout={handleLogout}/>;
  }

  if (isLoading) {
    return <div>Loading.....</div>
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>SecureVault</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setIsLogin(true)}
          style={{ 
            marginRight: '10px',
            fontWeight: isLogin ? 'bold' : 'normal'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          style={{ 
            fontWeight: !isLogin ? 'bold' : 'normal'
          }}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <LoginForm onLoginSuccess={handleAuthSuccess} />
      ) : (
        <SignUpForm onSignUpSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;