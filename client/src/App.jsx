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
    <div className="max-w-med mx-auto">
      <h1 className="text-center text-4xl text-gray-300 font-bold my-5 uppercase tracking-tight">SecureVault</h1>
      
      <div className="mb-5 flex justify-center gap-3">
        <button 
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 ${isLogin ? 'font-bold text-blue-600 border-b-2 border-blue-600' :
            'font-normal text-gray-600 hover:text-blue-800 transition-colors duration-300'}`}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 ${!isLogin ? 'font-bold text-blue-600 border-b-2 border-blue-600' :
          'font-normal text-gray-600 hover:text-blue-800 transition-colors duration-300'}`}
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