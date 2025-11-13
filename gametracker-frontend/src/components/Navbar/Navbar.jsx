import React from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate, currentView = 'biblioteca' }) => {
  // Función por defecto si no se pasa onNavigate
  const handleNavigation = (view) => {
    if (onNavigate) {
      onNavigate(view);
    } else {
      console.log('Navegando a:', view);
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { key: 'biblioteca', label: '📚 Biblioteca', path: '/' },
    { key: 'agregar-juego', label: '➕ Agregar Juego', path: '/agregar-juego' },
    { key: 'reseñas', label: '⭐ Reseñas', path: '/reseñas' },
    { key: 'estadisticas', label: '📊 Estadísticas', path: '/estadisticas' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (view) => {
    handleNavigation(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <h1>🎮 GameTracker</h1>
          <span className="nav-subtitle">Tu Biblioteca de Videojuegos</span>
        </div>

        {/* Menú hamburguesa para móvil */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'nav-links-open' : ''}`}>
          {navItems.map(item => (
            <button
              key={item.key}
              className={currentView === item.key ? 'nav-link active' : 'nav-link'}
              onClick={() => handleNavClick(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="theme-toggle">
            🌙 Tema
          </button>
        </div>
      </div>
      
      {/* Overlay para cerrar menú móvil */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;