import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import ListaReseñas from './components/ListaReseñas/ListaReseñas';
import FormularioReseña from './components/FormularioReseña/FormularioReseña';
import EstadisticasPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import './styles/themes.css';
import './App.css';

// Componente de partículas optimizado
const FloatingParticles = () => {
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const createParticle = () => {
      // Optimización para móviles - menos partículas
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;
      
      if (isMobile && Math.random() > 0.4) return;
      if (isTablet && Math.random() > 0.2) return;
      
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Estilo según el tema
      if (isDarkMode) {
        particle.style.background = `radial-gradient(circle, ${getRandomPurple()}, transparent)`;
      } else {
        particle.style.background = `radial-gradient(circle, ${getRandomGold()}, transparent)`;
      }
      
      const size = isMobile ? Math.random() * 2 + 1 : Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.animationDuration = `${Math.random() * 15 + 8}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      document.body.appendChild(particle);
      
      // Limpieza automática optimizada
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 20000);
    };
    
    const getRandomGold = () => {
      const golds = ['#d4af37', '#f8e8a8', '#fef3cd', '#b8941f'];
      return golds[Math.floor(Math.random() * golds.length)];
    };
    
    const getRandomPurple = () => {
      const purples = ['#8b5cf6', '#a78bfa', '#7c3aed', '#6d28d9'];
      return purples[Math.floor(Math.random() * purples.length)];
    };
    
    // Crear partículas iniciales optimizadas según dispositivo
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const initialParticles = isMobile ? 4 : isTablet ? 8 : 12;
    
    for (let i = 0; i < initialParticles; i++) {
      setTimeout(createParticle, i * 1000);
    }
    
    // Intervalo adaptativo para mejor performance
    const intervalTime = isMobile ? 4000 : isTablet ? 2500 : 2000;
    const interval = setInterval(createParticle, intervalTime);
    
    return () => {
      clearInterval(interval);
      // Limpiar partículas existentes
      document.querySelectorAll('.floating-particle').forEach(particle => {
        particle.remove();
      });
    };
  }, [isDarkMode]);
  
  return null;
};

// Navbar optimizado y responsive
const Navbar = React.memo(({ currentView, onNavigate }) => {
  const { isDarkMode, toggleTheme, themeName } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para efectos
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      key: 'biblioteca', 
      label: 'Biblioteca', 
      icon: '📜', 
      description: 'Salón de los Héroes' 
    },
    { 
      key: 'agregar-juego', 
      label: 'Agregar Juego', 
      icon: '⚔️', 
      description: 'Forjar Leyenda' 
    },
    { 
      key: 'reseñas', 
      label: 'Reseñas', 
      icon: '⭐', 
      description: 'Crónicas Divinas' 
    },
    { 
      key: 'estadisticas', 
      label: 'Estadísticas', 
      icon: '📊', 
      description: 'Oráculo del Progreso' 
    },
  ];

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavigation = useCallback((view) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  }, [onNavigate]);

  const getThemeQuote = useCallback(() => {
    return isDarkMode 
      ? "Bajo el manto de Hécate, tus juegos encuentran misterio"
      : "Bajo la luz de Apolo, tus juegos alcanzan la gloria";
  }, [isDarkMode]);

  // Cerrar menú móvil al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
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
                aria-current={currentView === item.key ? 'page' : undefined}
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
                aria-current={currentView === item.key ? 'page' : undefined}
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

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
});

Navbar.displayName = 'Navbar';

// Contenido principal de la app
const AppContent = () => {
  const [currentView, setCurrentView] = useState('biblioteca');
  const { isDarkMode } = useTheme();

  const renderView = useCallback(() => {
    const views = {
      'biblioteca': <BibliotecaJuegos />,
      'agregar-juego': <FormularioJuego />,
      'reseñas': <ListaReseñas />,
      'agregar-reseña': <FormularioReseña />,
      'estadisticas': <EstadisticasPersonales />
    };
    
    return views[currentView] || <BibliotecaJuegos />;
  }, [currentView]);

  return (
    <div className={`App ${isDarkMode ? 'theme-hecate' : 'theme-apolo'}`}>
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