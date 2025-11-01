import React, { useState } from 'react';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import ListaReseñas from './components/ListaReseñas/ListaReseñas';
import FormularioReseña from './components/FormularioReseña/FormularioReseña';
import EstadisticasPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import './App.css';

const NavbarSimple = ({ currentView, onNavigate }) => {
  const navItems = [
    { key: 'biblioteca', label: '📚 Biblioteca', icon: '📚' },
    { key: 'agregar-juego', label: '➕ Agregar Juego', icon: '➕' },
    { key: 'reseñas', label: '⭐ Reseñas', icon: '⭐' },
    { key: 'estadisticas', label: '📊 Estadísticas', icon: '📊' },
  ];

  return (
    <nav className="navbar-simple">
      <div className="nav-simple-container">
        <div className="nav-simple-brand">
          <h1>🎮 GameTracker</h1>
          <span>Tu Biblioteca de Videojuegos</span>
        </div>

        <div className="nav-simple-links">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`nav-simple-link ${currentView === item.key ? 'active' : ''}`}
              onClick={() => onNavigate(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

function App() {
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
      <NavbarSimple currentView={currentView} onNavigate={setCurrentView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;