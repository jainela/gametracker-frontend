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
      // Menos partículas en móvil para mejor performance
      const isMobile = window.innerWidth < 768;
      if (isMobile && Math.random() > 0.3) return;
      
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Estilo según el tema
      if (isDarkMode) {
        particle.style.background = `radial-gradient(circle, ${getRandomPurple()}, transparent)`;
      } else {
        particle.style.background = `radial-gradient(circle, ${getRandomGold()}, transparent)`;
      }
      
      const size = isMobile ? Math.random() * 3 + 1 : Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 12 + 6}s`;
      
      document.body.appendChild(particle);
      
      // Limpieza automática
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 18000);
    };
    
    const getRandomGold = () => {
      const golds = ['#d4af37', '#f8e8a8', '#fef3cd', '#b8941f'];
      return golds[Math.floor(Math.random() * golds.length)];
    };
    
    const getRandomPurple = () => {
      const purples = ['#8b5cf6', '#a78bfa', '#7c3aed', '#6d28d9'];
      return purples[Math.floor(Math.random() * purples.length)];
    };
    
    // Crear partículas iniciales optimizadas
    const initialParticles = window.innerWidth < 768 ? 6 : 12;
    for (let i = 0; i < initialParticles; i++) {
      setTimeout(createParticle, i * 800);
    }
    
    // Intervalo más largo para mejor performance
    const interval = setInterval(createParticle, 3000);
    
    return () => clearInterval(interval);
  }, [isDarkMode]);
  
  return null;
};

const Navbar = ({ currentView, onNavigate }) => {
  const { isDarkMode, toggleTheme, themeName } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'biblioteca', label: 'Biblioteca', icon: '📜', description: 'Salón de los Héroes' },
    { key: 'agregar-juego', label: 'Agregar Juego', icon: '⚔️', description: 'Forjar Leyenda' },
    { key: 'reseñas', label: 'Reseñas', icon: '⭐', description: 'Crónicas Divinas' },
    { key: 'estadisticas', label: 'Estadísticas', icon: '📊', description: 'Oráculo del Progreso' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (view) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const getThemeQuote = () => {
    return isDarkMode 
      ? "Bajo el manto de Hécate, tus juegos encuentran misterio"
      : "Bajo la luz de Apolo, tus juegos alcanzan la gloria";
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo y Brand Responsive */}
          <div className="nav-brand">
            <h1 className="epic-text gold-text">GAME TRACKER</h1>
            <span className="nav-subtitle">{getThemeQuote()}</span>
          </div>

          {/* Menú Desktop - Oculto en móvil */}
          <div className="nav-links desktop-only">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`nav-link ${currentView === item.key ? 'active' : ''}`}
                onClick={() => handleNavigation(item.key)}
                title={item.description}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label epic-text">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Acciones del Navbar */}
          <div className="nav-actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Cambiar a templo de ${isDarkMode ? 'Apolo' : 'Hécate'}`}
            >
              <span className="theme-icon">
                {isDarkMode ? '☀️' : '🌙'}
              </span>
              <span className="theme-text desktop-only">
                {themeName}
              </span>
            </button>

            {/* Botón Menú Mobile Hamburguesa */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Menú principal"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Menú Mobile Desplegable */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {navItems.map(item => (
              <button
                key={item.key}
                className={`mobile-nav-link ${currentView === item.key ? 'active' : ''}`}
                onClick={() => handleNavigation(item.key)}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span className="mobile-nav-label">{item.label}</span>
                <span className="mobile-nav-desc">{item.description}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Pilares decorativos - Solo en desktop */}
      <div className="temple-decoration pillar-left desktop-only"></div>
      <div className="temple-decoration pillar-right desktop-only"></div>
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