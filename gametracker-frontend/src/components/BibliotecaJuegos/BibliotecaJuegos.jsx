import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
  const { isDarkMode, themeName } = useTheme();
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    // Simular carga épica
    const timer = setTimeout(() => {
      setJuegos([
        {
          id: 1,
          titulo: 'The Legend of Zelda: Breath of the Wild',
          portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wya.jpg',
          completado: true,
          horas: 85,
          rating: 5,
          genero: 'Aventura Épica',
          plataforma: 'Nintendo Switch',
          dios: 'Apolo',
          fechaAdquisicion: '2023-05-15',
          ultimaSesion: '2024-01-20'
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
          dios: 'Hécate',
          fechaAdquisicion: '2023-08-22',
          ultimaSesion: '2024-01-18'
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
          dios: 'Apolo',
          fechaAdquisicion: '2023-11-10',
          ultimaSesion: '2024-01-15'
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
          dios: 'Hécate',
          fechaAdquisicion: '2023-09-05',
          ultimaSesion: '2024-01-12'
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
          dios: 'Ambos',
          fechaAdquisicion: '2023-07-18',
          ultimaSesion: '2024-01-22'
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
          dios: 'Apolo',
          fechaAdquisicion: '2023-12-01',
          ultimaSesion: '2024-01-10'
        }
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleEditJuego = (juego) => {
    console.log('Editando juego:', juego);
    // Efecto visual de edición
    document.getElementById(`juego-${juego.id}`)?.classList.add('editando');
    setTimeout(() => {
      document.getElementById(`juego-${juego.id}`)?.classList.remove('editando');
    }, 1000);
    
    alert(`📜 Editando las crónicas de: ${juego.titulo}`);
  };

  const handleDeleteJuego = (juegoId) => {
    const juego = juegos.find(j => j.id === juegoId);
    if (confirm(`¿Estás seguro de que deseas desterrar "${juego?.titulo}" de tu biblioteca?`)) {
      // Efecto visual de eliminación
      const elemento = document.getElementById(`juego-${juegoId}`);
      elemento?.classList.add('destierro');
      setTimeout(() => {
        setJuegos(juegos.filter(juego => juego.id !== juegoId));
      }, 600);
    }
  };

  // Estadísticas épicas mejoradas
  const juegosCompletados = juegos.filter(juego => juego.completado).length;
  const totalHoras = juegos.reduce((total, juego) => total + juego.horas, 0);
  const ratingPromedio = juegos.length > 0 
    ? (juegos.reduce((total, juego) => total + juego.rating, 0) / juegos.length).toFixed(1)
    : '0.0';
  
  const juegosApolo = juegos.filter(juego => juego.dios === 'Apolo').length;
  const juegosHecate = juegos.filter(juego => juego.dios === 'Hécate').length;
  const juegosAmbos = juegos.filter(juego => juego.dios === 'Ambos').length;

  const juegosFiltrados = filter === 'todos' 
    ? juegos 
    : juegos.filter(juego => 
        filter === 'completados' ? juego.completado :
        filter === 'apolo' ? juego.dios === 'Apolo' :
        filter === 'hecate' ? juego.dios === 'Hécate' :
        juego.dios === 'Ambos'
      );

  const getTempleGreeting = () => {
    return isDarkMode 
      ? "Bienvenido al Santuario Nocturno de Hécate"
      : "Bienvenido al Templo Radiante de Apolo";
  };

  const getGodQuote = () => {
    const apoloQuotes = [
      "Que la luz guíe tu camino gaming",
      "La gloria espera a los valientes",
      "Cada victoria es una ofrenda al sol",
      "Tu destreza brilla como el amanecer"
    ];
    const hecateQuotes = [
      "En la oscuridad, los secretos se revelan",
      "La luna testifica tus hazañas",
      "Los misterios aguardan a los audaces",
      "La noche oculta tesoros inesperados"
    ];
    
    const quotes = isDarkMode ? hecateQuotes : apoloQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  if (loading) {
    return (
      <div className="santuario-cargando">
        <div className="oraculo-cargando">
          <div className="esfera-carga glow-orb"></div>
          <h2 className="epic-text gold-text">Consultando al Oráculo...</h2>
          <p>El destino de tu biblioteca se revela</p>
          <div className="runas-cargando">
            <span className="runa">⚡</span>
            <span className="runa">🔮</span>
            <span className="runa">✨</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="biblioteca-container">
      {/* Header épico del templo con animaciones */}
      <header className="biblioteca-header">
        <div className="temple-banner">
          <h1 className="epic-text gold-text text-glow">🎮 SANTUARIO DE JUEGOS</h1>
          <div className="god-emblems">
            <span className={`emblem float-effect ${isDarkMode ? 'emblem-hecate' : 'emblem-apolo'}`}>
              {isDarkMode ? '🌙' : '☀️'}
            </span>
          </div>
        </div>
        <p className="temple-greeting">{getTempleGreeting()}</p>
        <p className="god-quote">"{getGodQuote()}"</p>
      </header>

      {/* Tablilla de estadísticas divinas mejorada */}
      <div className="divine-stats">
        <div className="oracle-cards">
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">📜</div>
            <h3>Total de Leyendas</h3>
            <span className="oracle-number">{juegos.length}</span>
            <div className="oracle-subtitle">En tu Panteón</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">🎯</div>
            <h3>Hazañas Completadas</h3>
            <span className="oracle-number">{juegosCompletados}</span>
            <div className="oracle-subtitle">Victorias Eternas</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">⏳</div>
            <h3>Tiempo Invertido</h3>
            <span className="oracle-number">{totalHoras}h</span>
            <div className="oracle-subtitle">En el Olimpo</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">⭐</div>
            <h3>Gloria Promedio</h3>
            <span className="oracle-number">{ratingPromedio}/5</span>
            <div className="oracle-subtitle">Estrellas Divinas</div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">☀️</div>
            <h3>Favores de Apolo</h3>
            <span className="oracle-number">{juegosApolo}</span>
            <div className="oracle-subtitle">Juegos de Luz</div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">🌙</div>
            <h3>Secretos de Hécate</h3>
            <span className="oracle-number">{juegosHecate}</span>
            <div className="oracle-subtitle">Juegos de Noche</div>
          </div>
        </div>
      </div>

      {/* Filtros divinos mejorados */}
      <div className="filtros-divinos">
        <div className="filtros-container">
          <h3 className="filtros-titulo">🔮 Filtros del Oráculo</h3>
          <div className="filtros-opciones">
            <button 
              className={`filtro-btn ${filter === 'todos' ? 'activo' : ''}`}
              onClick={() => setFilter('todos')}
            >
              🌟 Todos
            </button>
            <button 
              className={`filtro-btn ${filter === 'completados' ? 'activo' : ''}`}
              onClick={() => setFilter('completados')}
            >
              ✅ Completados
            </button>
            <button 
              className={`filtro-btn ${filter === 'apolo' ? 'activo' : ''}`}
              onClick={() => setFilter('apolo')}
            >
              ☀️ Apolo
            </button>
            <button 
              className={`filtro-btn ${filter === 'hecate' ? 'activo' : ''}`}
              onClick={() => setFilter('hecate')}
            >
              🌙 Hécate
            </button>
            <button 
              className={`filtro-btn ${filter === 'ambos' ? 'activo' : ''}`}
              onClick={() => setFilter('ambos')}
            >
              ⚡ Ambos
            </button>
          </div>
        </div>
      </div>

      {/* Salón principal de juegos mejorado */}
      <section className="hall-of-games">
        <div className="hall-header">
          <h2 className="epic-text text-glow">🏛️ SALÓN DE LOS HÉROES</h2>
          <p className="hall-subtitle">
            Mostrando {juegosFiltrados.length} de {juegos.length} leyendas
            {filter !== 'todos' && ` • Filtrado por: ${filter}`}
          </p>
          
          <div className="divine-actions">
            <button className="btn btn-epic btn-forge glow-on-hover">
              ⚔️ Forjar Nueva Leyenda
            </button>
            <button className="btn btn-magic btn-filter glow-on-hover">
              🔮 Ordenar por Poder
            </button>
          </div>
        </div>

        {juegosFiltrados.length === 0 ? (
          <div className="empty-sanctuary">
            <div className="empty-icon float-effect">🏺</div>
            <h3>El Santuario está Vacío</h3>
            <p>No se encontraron leyendas con los filtros seleccionados</p>
            <button 
              className="btn btn-epic btn-forge"
              onClick={() => setFilter('todos')}
            >
              🌟 Mostrar Todas las Leyendas
            </button>
          </div>
        ) : (
          <div className="sacred-grid">
            {juegosFiltrados.map(juego => (
              <div key={juego.id} id={`juego-${juego.id}`}>
                <TarjetaJuego 
                  juego={juego}
                  onEdit={handleEditJuego}
                  onDelete={handleDeleteJuego}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Altar de reflexión mejorado */}
      <footer className="temple-footer">
        <div className="altar-wisdom">
          <p className="wisdom-text text-glow">
            {isDarkMode 
              ? "Hécate susurra: 'Cada juego es un hechizo, cada hora un ritual'" 
              : "Apolo proclama: 'Cada juego es un poema, cada hora una canción'"
            }
          </p>
          <div className="altar-offerings">
            <span className="offering">🎮 {juegos.length} Leyendas</span>
            <span className="offering">⏱️ {totalHoras} Horas de Gloria</span>
            <span className="offering">⭐ {ratingPromedio} Estrellas Divinas</span>
            <span className="offering">🎯 {juegosCompletados} Victorias</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BibliotecaJuegos;