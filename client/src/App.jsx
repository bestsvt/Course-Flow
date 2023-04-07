import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';
import { useAuth } from './contexts/authentication';

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
  )
}

export default App
