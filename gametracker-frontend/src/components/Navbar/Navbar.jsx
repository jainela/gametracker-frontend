// src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🎮 GameTracker</h2>
      </div>
      
      <div className="nav-links">
        <Link to="/">Biblioteca</Link>
        <Link to="/agregar-juego">Agregar Juego</Link>
        <Link to="/reseñas">Reseñas</Link>
        <Link to="/estadisticas">Estadísticas</Link>
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Apolo' : '🌙 Hécate'}
      </button>
    </nav>
  );
};

export default Navbar;