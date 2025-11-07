import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import ListaReseñas from './components/ListaReseñas/ListaReseñas';
import FormularioReseña from './components/FormularioReseña/FormularioReseña';
import EstadisticasPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import './styles/themes.css';
import './App.css';

const FloatingParticles = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Estilo según el tema
      if (isDarkMode) {
        particle.style.background = `radial-gradient(circle, ${getRandomPurple()}, transparent)`;
      } else {
        particle.style.background = `radial-gradient(circle, ${getRandomGold()}, transparent)`;
      }
      
      particle.style.width = `${Math.random() * 6 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
      
      document.body.appendChild(particle);
      
      // Remover después de la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 30000);
    };
    
    const getRandomGold = () => {
      const golds = ['#d4af37', '#f8e8a8', '#fef3cd', '#b8941f'];
      return golds[Math.floor(Math.random() * golds.length)];
    };
    
    const getRandomPurple = () => {
      const purples = ['#8b5cf6', '#a78bfa', '#7c3aed', '#6d28d9'];
      return purples[Math.floor(Math.random() * purples.length)];
    };
    
    // Crear partículas iniciales
    for (let i = 0; i < 15; i++) {
      setTimeout(createParticle, i * 500);
    }
    
    // Continuar creando partículas
    const interval = setInterval(createParticle, 2000);
    
    return () => clearInterval(interval);
  }, [isDarkMode]);
  
  return null;
};

const Navbar = ({ currentView, onNavigate }) => {
  const { isDarkMode, toggleTheme, themeName } = useTheme();

  const navItems = [
    { key: 'biblioteca', label: 'Biblioteca', icon: '📜', description: 'Salón de los Héroes' },
    { key: 'agregar-juego', label: 'Agregar Juego', icon: '⚔️', description: 'Forjar Leyenda' },
    { key: 'reseñas', label: 'Reseñas', icon: '⭐', description: 'Crónicas Divinas' },
    { key: 'estadisticas', label: 'Estadísticas', icon: '📊', description: 'Oráculo del Progreso' },
  ];

  const getThemeQuote = () => {
    return isDarkMode 
      ? "Bajo el manto de Hécate, tus juegos encuentran misterio"
      : "Bajo la luz de Apolo, tus juegos alcanzan la gloria";
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 className="epic-text gold-text">GAME TRACKER</h1>
            <span className="nav-subtitle">{getThemeQuote()}</span>
          </div>

          <div className="nav-links">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`nav-link ${currentView === item.key ? 'active' : ''}`}
                onClick={() => onNavigate(item.key)}
                title={item.description}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label epic-text">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Cambiar a templo de ${isDarkMode ? 'Apolo' : 'Hécate'}`}
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
      
      {/* Pilares decorativos */}
      <div className="temple-decoration pillar-left"></div>
      <div className="temple-decoration pillar-right"></div>
    </>
  );
};

const AppContent = () => {
  const [currentView, setCurrentView] = useState('biblioteca');
  const { isDarkMode } = useTheme();

  const renderView = () => {
    const views = {
      'biblioteca': <BibliotecaJuegos />,
      'agregar-juego': <FormularioJuego />,
      'reseñas': <ListaReseñas />,
      'agregar-reseña': <FormularioReseña />,
      'estadisticas': <EstadisticasPersonales />
    };
    
    return views[currentView] || <BibliotecaJuegos />;
  };

  return (
    <div className={`App ${isDarkMode ? 'temple-hecate' : 'temple-apolo'}`}>
      <FloatingParticles />
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