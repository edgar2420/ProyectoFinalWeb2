import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './pages/Auth/login.jsx';
import RegisterForm from './pages/Auth/register.jsx';
import Dashboard from './pages/User/Dashboard.jsx'; // Fixed the casing of the file name


const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm /> },
  {path: '/dashboard', element: <Dashboard />}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
