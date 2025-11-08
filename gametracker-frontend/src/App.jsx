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
  const { isDarkMode, toggleTheme, themeName, soundsEnabled, toggleSounds, playClickSound, playHoverSound } = useTheme();

  const navItems = [
    { key: 'biblioteca', label: 'Biblioteca', icon: '📜', description: 'Salón de los Héroes' },
    { key: 'agregar-juego', label: 'Agregar Juego', icon: '⚔️', description: 'Forjar Leyenda' },
    { key: 'reseñas', label: 'Reseñas', icon: '⭐', description: 'Crónicas Divinas' },
    { key: 'estadisticas', label: 'Estadísticas', icon: '📊', description: 'Oráculo del Progreso' },
  ];

  const handleNavClick = (viewKey) => {
    playClickSound();
    onNavigate(viewKey);
  };

  const handleThemeToggle = () => {
    playClickSound();
    toggleTheme();
  };

  const handleSoundToggle = () => {
    playClickSound();
    toggleSounds();
  };

  const handleHover = () => {
    playHoverSound();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 className="epic-text gold-text">GAME TRACKER</h1>
            <span className="nav-subtitle">
              {isDarkMode 
                ? "Bajo el manto de Hécate, tus juegos encuentran misterio" 
                : "Bajo la luz de Apolo, tus juegos alcanzan la gloria"}
            </span>
          </div>

          <div className="nav-links">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`nav-link ${currentView === item.key ? 'active' : ''}`}
                onClick={() => handleNavClick(item.key)}
                onMouseEnter={handleHover}
                title={item.description}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label epic-text">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button 
              className="sound-toggle"
              onClick={handleSoundToggle}
              onMouseEnter={handleHover}
              title={soundsEnabled ? '🔊 Sonidos activados' : '🔇 Sonidos desactivados'}
            >
              <span className="sound-icon">
                {soundsEnabled ? '🔊' : '🔇'}
              </span>
            </button>
            
            <button 
              className="theme-toggle"
              onClick={handleThemeToggle}
              onMouseEnter={handleHover}
            >
              <span className="theme-icon">
                {isDarkMode ? '☀️' : '🌙'}
              </span>
              <span className="theme-text">
                {themeName}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

const AppContent = () => {
  const [currentView, setCurrentView] = useState('biblioteca');
  const { isDarkMode } = useTheme();

  const renderView = () => {
    switch(currentView) {
      case 'biblioteca': return <BibliotecaJuegos />;
      case 'agregar-juego': return <FormularioJuego />;
      case 'reseñas': return <ListaReseñas />;
      case 'estadisticas': return <EstadisticasPersonales />;
      default: return <BibliotecaJuegos />;
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'temple-hecate' : 'temple-apolo'}`}>
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