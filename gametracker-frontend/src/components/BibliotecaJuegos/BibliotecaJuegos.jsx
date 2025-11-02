import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
  const { isDarkMode, themeName } = useTheme();
  const [juegos, setJuegos] = useState([
    {
      id: 1,
      titulo: 'The Legend of Zelda: Breath of the Wild',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wya.jpg',
      completado: true,
      horas: 85,
      rating: 5,
      genero: 'Aventura Épica',
      plataforma: 'Nintendo Switch',
      dios: 'Apolo'
    },
    {
      id: 2,
      titulo: 'Hollow Knight',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.jpg',
      completado: false,
      horas: 42,
      rating: 4,
      genero: 'Metroidvania Oscuro',
      plataforma: 'PC',
      dios: 'Hécate'
    },
    {
      id: 3,
      titulo: 'God of War',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg',
      completado: true,
      horas: 35,
      rating: 5,
      genero: 'Mitología Nórdica',
      plataforma: 'PlayStation',
      dios: 'Apolo'
    },
    {
      id: 4,
      titulo: 'Bloodborne',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.jpg',
      completado: false,
      horas: 68,
      rating: 5,
      genero: 'Horror Gótico',
      plataforma: 'PlayStation',
      dios: 'Hécate'
    },
    {
      id: 5,
      titulo: 'Hades',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2c1l.jpg',
      completado: true,
      horas: 92,
      rating: 5,
      genero: 'Roguelike Mitológico',
      plataforma: 'Multiplataforma',
      dios: 'Ambos'
    },
    {
      id: 6,
      titulo: 'Journey',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r5z.jpg',
      completado: true,
      horas: 4,
      rating: 4,
      genero: 'Aventura Espiritual',
      plataforma: 'PlayStation',
      dios: 'Apolo'
    }
  ]);

  const handleEditJuego = (juego) => {
    console.log('Editando juego:', juego);
    alert(`📜 Editando las crónicas de: ${juego.titulo}`);
  };

  const handleDeleteJuego = (juegoId) => {
    if (confirm('¿Estás seguro de que deseas desterrar este juego de tu biblioteca?')) {
      setJuegos(juegos.filter(juego => juego.id !== juegoId));
    }
  };

  // Estadísticas épicas
  const juegosCompletados = juegos.filter(juego => juego.completado).length;
  const totalHoras = juegos.reduce((total, juego) => total + juego.horas, 0);
  const ratingPromedio = juegos.length > 0 
    ? (juegos.reduce((total, juego) => total + juego.rating, 0) / juegos.length).toFixed(1)
    : '0.0';
  
  const juegosApolo = juegos.filter(juego => juego.dios === 'Apolo').length;
  const juegosHecate = juegos.filter(juego => juego.dios === 'Hécate').length;

  const getTempleGreeting = () => {
    return isDarkMode 
      ? "Bienvenido al Santuario Nocturno de Hécate"
      : "Bienvenido al Templo Radiante de Apolo";
  };

  const getGodQuote = () => {
    const apoloQuotes = [
      "Que la luz guíe tu camino gaming",
      "La gloria espera a los valientes",
      "Cada victoria es una ofrenda al sol"
    ];
    const hecateQuotes = [
      "En la oscuridad, los secretos se revelan",
      "La luna testifica tus hazañas",
      "Los misterios aguardan a los audaces"
    ];
    
    const quotes = isDarkMode ? hecateQuotes : apoloQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="biblioteca-container">
      {/* Header épico del templo */}
      <header className="biblioteca-header">
        <div className="temple-banner">
          <h1 className="epic-text gold-text">🎮 SANTUARIO DE JUEGOS</h1>
          <div className="god-emblems">
            <span className={`emblem ${isDarkMode ? 'emblem-hecate' : 'emblem-apolo'}`}>
              {isDarkMode ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
        <p className="temple-greeting">{getTempleGreeting()}</p>
        <p className="god-quote">"{getGodQuote()}"</p>
      </header>

      {/* Tablilla de estadísticas divinas */}
      <div className="divine-stats">
        <div className="oracle-cards">
          <div className="oracle-card">
            <div className="oracle-icon">📜</div>
            <h3>Total de Leyendas</h3>
            <span className="oracle-number">{juegos.length}</span>
          </div>
          <div className="oracle-card">
            <div className="oracle-icon">🎯</div>
            <h3>Hazañas Completadas</h3>
            <span className="oracle-number">{juegosCompletados}</span>
          </div>
          <div className="oracle-card">
            <div className="oracle-icon">⏳</div>
            <h3>Tiempo Invertido</h3>
            <span className="oracle-number">{totalHoras}h</span>
          </div>
          <div className="oracle-card">
            <div className="oracle-icon">⭐</div>
            <h3>Gloria Promedio</h3>
            <span className="oracle-number">{ratingPromedio}/5</span>
          </div>
          <div className="oracle-card god-card">
            <div className="oracle-icon">☀️</div>
            <h3>Favores de Apolo</h3>
            <span className="oracle-number">{juegosApolo}</span>
          </div>
          <div className="oracle-card god-card">
            <div className="oracle-icon">🌙</div>
            <h3>Secretos de Hécate</h3>
            <span className="oracle-number">{juegosHecate}</span>
          </div>
        </div>
      </div>

      {/* Salón principal de juegos */}
      <section className="hall-of-games">
        <div className="hall-header">
          <h2 className="epic-text">🏛️ SALÓN DE LOS HÉROES</h2>
          <p className="hall-subtitle">Tu legado gaming eternizado en el templo</p>
          
          <div className="divine-actions">
            <button className="btn btn-epic btn-forge">
              ⚔️ Forjar Nueva Leyenda
            </button>
            <button className="btn btn-magic btn-filter">
              🔮 Filtros Divinos
            </button>
          </div>
        </div>

        {juegos.length === 0 ? (
          <div className="empty-sanctuary">
            <div className="empty-icon">🏺</div>
            <h3>El Santuario está Vacío</h3>
            <p>Comienza tu epopeya gaming forjando tu primera leyenda</p>
            <button className="btn btn-epic btn-forge">
              ⚔️ Comenzar Leyenda
            </button>
          </div>
        ) : (
          <div className="sacred-grid">
            {juegos.map(juego => (
              <TarjetaJuego 
                key={juego.id}
                juego={juego}
                onEdit={handleEditJuego}
                onDelete={handleDeleteJuego}
              />
            ))}
          </div>
        )}
      </section>

      {/* Altar de reflexión */}
      <footer className="temple-footer">
        <div className="altar-wisdom">
          <p className="wisdom-text">
            {isDarkMode 
              ? "Hécate susurra: 'Cada juego es un hechizo, cada hora un ritual'" 
              : "Apolo proclama: 'Cada juego es un poema, cada hora una canción'"
            }
          </p>
          <div className="altar-offerings">
            <span className="offering">🎮 {juegos.length} Leyendas</span>
            <span className="offering">⏱️ {totalHoras} Horas de Gloria</span>
            <span className="offering">⭐ {ratingPromedio} Estrellas Divinas</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BibliotecaJuegos;