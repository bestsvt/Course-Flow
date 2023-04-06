import './App.css'
import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';


function App() {

  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
  )
}

export default App
