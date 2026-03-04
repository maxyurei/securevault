import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";

function App() {
  const handleSignUpOnSuccess = () => {
    console.log('SignIn successful!');
  };


  return (
    <div style={{maxWidth: '400px', margin: '50px auto'}}>
      <h1>SecureVault</h1>
      <SignUpForm onSignUpSuccess={handleSignUpOnSuccess} ></SignUpForm>
    </div>
  );
}

export default App;