import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import LoginForm from './pages/Auth/login'; // Asegúrate de que esta ruta es correcta
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <>
      <Menu user={user} onLogout={handleLogout} />
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
