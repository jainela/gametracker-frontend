import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
  const { isDarkMode, themeName } = useTheme();
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');
  const [sortBy, setSortBy] = useState('fecha');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo optimizados
  const juegosEjemplo = useMemo(() => [
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
      ultimaSesion: '2024-01-20',
      tags: ['Mundo Abierto', 'Aventura', 'Nintendo']
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
      ultimaSesion: '2024-01-18',
      tags: ['Metroidvania', 'Indie', 'Desafiante']
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
      ultimaSesion: '2024-01-15',
      tags: ['Acción', 'Mitología', 'Historia']
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
      ultimaSesion: '2024-01-12',
      tags: ['Souls-like', 'Horror', 'Desafiante']
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
      ultimaSesion: '2024-01-22',
      tags: ['Roguelike', 'Mitología', 'Indie']
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
      ultimaSesion: '2024-01-10',
      tags: ['Aventura', 'Arte', 'Corto']
    }
  ], []);

  useEffect(() => {
    // Simular carga épica con datos optimizados
    const timer = setTimeout(() => {
      setJuegos(juegosEjemplo);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [juegosEjemplo]);

  // Estadísticas épicas optimizadas con useMemo
  const estadisticas = useMemo(() => {
    const juegosCompletados = juegos.filter(juego => juego.completado).length;
    const totalHoras = juegos.reduce((total, juego) => total + juego.horas, 0);
    const ratingPromedio = juegos.length > 0 
      ? (juegos.reduce((total, juego) => total + juego.rating, 0) / juegos.length).toFixed(1)
      : '0.0';
    
    const juegosApolo = juegos.filter(juego => juego.dios === 'Apolo').length;
    const juegosHecate = juegos.filter(juego => juego.dios === 'Hécate').length;
    const juegosAmbos = juegos.filter(juego => juego.dios === 'Ambos').length;

    return {
      juegosCompletados,
      totalHoras,
      ratingPromedio,
      juegosApolo,
      juegosHecate,
      juegosAmbos
    };
  }, [juegos]);

  // Filtrado y ordenamiento optimizado
  const juegosFiltrados = useMemo(() => {
    let filtered = juegos.filter(juego => {
      const matchesFilter = 
        filter === 'todos' ? true :
        filter === 'completados' ? juego.completado :
        filter === 'apolo' ? juego.dios === 'Apolo' :
        filter === 'hecate' ? juego.dios === 'Hécate' :
        juego.dios === 'Ambos';

      const matchesSearch = searchTerm === '' || 
        juego.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        juego.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        juego.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesFilter && matchesSearch;
    });

    // Ordenamiento
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'titulo':
          return a.titulo.localeCompare(b.titulo);
        case 'horas':
          return b.horas - a.horas;
        case 'rating':
          return b.rating - a.rating;
        case 'fecha':
        default:
          return new Date(b.fechaAdquisicion) - new Date(a.fechaAdquisicion);
      }
    });
  }, [juegos, filter, searchTerm, sortBy]);

  const handleEditJuego = (juego) => {
    // Efecto visual mejorado
    const elemento = document.getElementById(`juego-${juego.id}`);
    elemento?.classList.add('editando');
    
    setTimeout(() => {
      elemento?.classList.remove('editando');
      console.log('Editando juego:', juego);
      alert(`📜 Editando las crónicas de: ${juego.titulo}`);
    }, 800);
  };

  const handleDeleteJuego = (juegoId) => {
    const juego = juegos.find(j => j.id === juegoId);
    if (confirm(`¿Estás seguro de que deseas desterrar "${juego?.titulo}" de tu biblioteca?`)) {
      // Efecto visual de eliminación mejorado
      const elemento = document.getElementById(`juego-${juegoId}`);
      elemento?.classList.add('destierro');
      
      setTimeout(() => {
        setJuegos(juegos.filter(juego => juego.id !== juegoId));
      }, 600);
    }
  };

  const handleAddJuego = () => {
    // Navegación mejorada para agregar juego
    alert('⚔️ Redirigiendo al forjador de leyendas...');
    // En una implementación real, esto navegaría a FormularioJuego
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    // Feedback visual
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => btn.classList.remove('active'));
    event?.target?.classList.add('active');
  };

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

  // Renderizado de carga optimizado
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
            <span className="oracle-number">{estadisticas.juegosCompletados}</span>
            <div className="oracle-subtitle">Victorias Eternas</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">⏳</div>
            <h3>Tiempo Invertido</h3>
            <span className="oracle-number">{estadisticas.totalHoras}h</span>
            <div className="oracle-subtitle">En el Olimpo</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">⭐</div>
            <h3>Gloria Promedio</h3>
            <span className="oracle-number">{estadisticas.ratingPromedio}/5</span>
            <div className="oracle-subtitle">Estrellas Divinas</div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">☀️</div>
            <h3>Favores de Apolo</h3>
            <span className="oracle-number">{estadisticas.juegosApolo}</span>
            <div className="oracle-subtitle">Juegos de Luz</div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">🌙</div>
            <h3>Secretos de Hécate</h3>
            <span className="oracle-number">{estadisticas.juegosHecate}</span>
            <div className="oracle-subtitle">Juegos de Noche</div>
          </div>
        </div>
      </div>

      {/* Panel de control mejorado con búsqueda y filtros */}
      <div className="control-panel">
        <div className="control-container">
          {/* Búsqueda divina */}
          <div className="search-section">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar entre tus leyendas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filtros y ordenamiento */}
          <div className="filters-section">
            <div className="filters-container">
              <h3 className="filters-title">🔮 Filtros del Oráculo</h3>
              
              <div className="filters-group">
                <div className="filter-options">
                  {[
                    { key: 'todos', label: '🌟 Todos', icon: '🌟' },
                    { key: 'completados', label: '✅ Completados', icon: '✅' },
                    { key: 'apolo', label: '☀️ Apolo', icon: '☀️' },
                    { key: 'hecate', label: '🌙 Hécate', icon: '🌙' },
                    { key: 'ambos', label: '⚡ Ambos', icon: '⚡' }
                  ].map(option => (
                    <button
                      key={option.key}
                      className={`filtro-btn ${filter === option.key ? 'activo' : ''}`}
                      onClick={() => setFilter(option.key)}
                    >
                      <span className="filter-icon">{option.icon}</span>
                      <span className="filter-label">{option.label}</span>
                    </button>
                  ))}
                </div>

                <div className="sort-options">
                  <span className="sort-label">Ordenar por:</span>
                  <div className="sort-buttons">
                    {[
                      { key: 'fecha', label: '📅 Fecha', icon: '📅' },
                      { key: 'titulo', label: '🔤 Título', icon: '🔤' },
                      { key: 'horas', label: '⏱️ Horas', icon: '⏱️' },
                      { key: 'rating', label: '⭐ Rating', icon: '⭐' }
                    ].map(option => (
                      <button
                        key={option.key}
                        className={`sort-btn ${sortBy === option.key ? 'active' : ''}`}
                        onClick={() => handleSortChange(option.key)}
                      >
                        <span className="sort-icon">{option.icon}</span>
                        <span className="sort-label">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Salón principal de juegos mejorado */}
      <section className="hall-of-games">
        <div className="hall-header">
          <h2 className="epic-text text-glow">🏛️ SALÓN DE LOS HÉROES</h2>
          
          <div className="hall-info">
            <p className="hall-subtitle">
              Mostrando <strong>{juegosFiltrados.length}</strong> de <strong>{juegos.length}</strong> leyendas
              {filter !== 'todos' && ` • Filtrado por: ${filter}`}
              {searchTerm && ` • Búsqueda: "${searchTerm}"`}
            </p>
            
            <div className="hall-stats">
              <span className="stat-badge">
                <span className="stat-icon">📊</span>
                {juegosFiltrados.length} juegos
              </span>
              <span className="stat-badge">
                <span className="stat-icon">⏱️</span>
                {juegosFiltrados.reduce((total, juego) => total + juego.horas, 0)}h total
              </span>
            </div>
          </div>
          
          <div className="divine-actions">
            <button 
              className="btn btn-epic btn-forge glow-on-hover"
              onClick={handleAddJuego}
            >
              <span className="btn-icon">⚔️</span>
              <span className="btn-text">Forjar Nueva Leyenda</span>
            </button>
            
            <div className="view-controls">
              <button className="btn btn-magic btn-view active" title="Vista de cuadrícula">
                <span className="btn-icon">⏹️</span>
              </button>
              <button className="btn btn-magic btn-view" title="Vista de lista">
                <span className="btn-icon">📋</span>
              </button>
            </div>
          </div>
        </div>

        {juegosFiltrados.length === 0 ? (
          <div className="empty-sanctuary">
            <div className="empty-icon float-effect">
              {searchTerm ? '🔍' : '🏺'}
            </div>
            <h3>
              {searchTerm ? 'No se encontraron leyendas' : 'El Santuario está Vacío'}
            </h3>
            <p>
              {searchTerm 
                ? `No hay juegos que coincidan con "${searchTerm}". Prueba con otros términos.`
                : 'No se encontraron leyendas con los filtros seleccionados'
              }
            </p>
            <div className="empty-actions">
              <button 
                className="btn btn-epic"
                onClick={() => {
                  setFilter('todos');
                  setSearchTerm('');
                }}
              >
                🌟 Mostrar Todas las Leyendas
              </button>
              {searchTerm && (
                <button 
                  className="btn btn-magic"
                  onClick={() => setSearchTerm('')}
                >
                  🔄 Limpiar Búsqueda
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Grid sagrado mejorado */}
            <div className="sacred-grid">
              {juegosFiltrados.map(juego => (
                <div key={juego.id} id={`juego-${juego.id}`} className="game-item">
                  <TarjetaJuego 
                    juego={juego}
                    onEdit={handleEditJuego}
                    onDelete={handleDeleteJuego}
                  />
                </div>
              ))}
            </div>

            {/* Paginación o carga más */}
            {juegosFiltrados.length > 6 && (
              <div className="load-more-section">
                <button className="btn btn-magic btn-load-more">
                  <span className="btn-icon">⬇️</span>
                  <span className="btn-text">Cargar Más Leyendas</span>
                </button>
              </div>
            )}
          </>
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
            <span className="offering">
              <span className="offering-icon">🎮</span>
              {juegos.length} Leyendas
            </span>
            <span className="offering">
              <span className="offering-icon">⏱️</span>
              {estadisticas.totalHoras} Horas de Gloria
            </span>
            <span className="offering">
              <span className="offering-icon">⭐</span>
              {estadisticas.ratingPromedio} Estrellas Divinas
            </span>
            <span className="offering">
              <span className="offering-icon">🎯</span>
              {estadisticas.juegosCompletados} Victorias
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BibliotecaJuegos;