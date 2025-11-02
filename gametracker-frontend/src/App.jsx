import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import ListaReseñas from './components/ListaReseñas/ListaReseñas';
import FormularioReseña from './components/FormularioReseña/FormularioReseña';
import EstadisticasPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import './styles/themes.css';
import './App.css';

const Navbar = ({ currentView, onNavigate }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { key: 'biblioteca', label: '📚 Biblioteca', icon: '📚' },
    { key: 'agregar-juego', label: '➕ Agregar Juego', icon: '➕' },
    { key: 'reseñas', label: '⭐ Reseñas', icon: '⭐' },
    { key: 'estadisticas', label: '📊 Estadísticas', icon: '📊' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>🎮 GameTracker</h1>
          <span className="nav-subtitle">Tu Biblioteca de Videojuegos</span>
        </div>

        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-link ${currentView === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Cambiar a tema Apolo' : 'Cambiar a tema Hécate'}
          >
            <span className="theme-icon">
              {isDarkMode ? '☀️' : '🌙'}
            </span>
            <span className="theme-text">
              {isDarkMode ? 'Apolo' : 'Hécate'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const [currentView, setCurrentView] = useState('biblioteca');

  const renderView = () => {
    switch (currentView) {
      case 'biblioteca':
        return <BibliotecaJuegos />;
      case 'agregar-juego':
        return <FormularioJuego />;
      case 'reseñas':
        return <ListaReseñas />;
      case 'agregar-reseña':
        return <FormularioReseña />;
      case 'estadisticas':
        return <EstadisticasPersonales />;
      default:
        return <BibliotecaJuegos />;
    }
  };

  return (
    <div className="App">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;