import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
  const { isDarkMode } = useTheme();
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todos');
  const [sortBy, setSortBy] = useState('fecha');
  const [searchTerm, setSearchTerm] = useState('');

  const cargarJuegos = async () => {
    try {
      setLoading(true);
      setError(null);
      const respuesta = await fetch('http://localhost:3000/api/juegos');
      if (!respuesta.ok) throw new Error(`Error ${respuesta.status}: No se pudieron cargar los juegos`);
      const datos = await respuesta.json();
      const juegosTransformados = datos.map(juego => ({
        id: juego._id,
        titulo: juego.nombre,
        portada: juego.portadaURL,
        completado: juego.estado === 'Completado',
        horas: juego.horasJugadas || 0,
        rating: juego.rating || 0,
        genero: juego.genero || 'Sin género',
        plataforma: juego.plataforma || 'Desconocida',
        dios: juego.dios || 'Apolo',
        fechaAdquisicion: juego.fechaAdquisicion || new Date().toISOString().split('T')[0],
        ultimaSesion: juego.ultimaSesion || new Date().toISOString().split('T')[0],
        tags: juego.tags || []
      }));
      setJuegos(juegosTransformados);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const estadisticas = useMemo(() => {
    const juegosCompletados = juegos.filter(j => j.completado).length;
    const totalHoras = juegos.reduce((acc, j) => acc + j.horas, 0);
    const ratingPromedio = juegos.length > 0
      ? (juegos.reduce((acc, j) => acc + j.rating, 0) / juegos.length).toFixed(1)
      : '0.0';
    const juegosApolo = juegos.filter(j => j.dios === 'Apolo').length;
    const juegosHecate = juegos.filter(j => j.dios === 'Hécate').length;
    const juegosAmbos = juegos.filter(j => j.dios === 'Ambos').length;
    return { juegosCompletados, totalHoras, ratingPromedio, juegosApolo, juegosHecate, juegosAmbos };
  }, [juegos]);

  const juegosFiltrados = useMemo(() => {
    let filtrados = juegos.filter(j => {
      const porFiltro =
        filter === 'todos' ? true :
        filter === 'completados' ? j.completado :
        filter === 'apolo' ? j.dios === 'Apolo' :
        filter === 'hecate' ? j.dios === 'Hécate' :
        j.dios === 'Ambos';
      const porBusqueda =
        searchTerm === '' ||
        j.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return porFiltro && porBusqueda;
    });

    return filtrados.sort((a, b) => {
      switch (sortBy) {
        case 'titulo': return a.titulo.localeCompare(b.titulo);
        case 'horas': return b.horas - a.horas;
        case 'rating': return b.rating - a.rating;
        case 'fecha':
        default: return new Date(b.fechaAdquisicion) - new Date(a.fechaAdquisicion);
      }
    });
  }, [juegos, filter, searchTerm, sortBy]);

  const handleEditJuego = async (juego) => {
    const elemento = document.getElementById(`juego-${juego.id}`);
    elemento?.classList.add('editando');
    try {
      await fetch(`http://localhost:3000/api/juegos/${juego.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(juego)
      });
      setTimeout(() => {
        elemento?.classList.remove('editando');
        alert(`📜 Editando las crónicas de: ${juego.titulo}`);
      }, 800);
    } catch (err) {
      console.error('Error al editar juego:', err);
      elemento?.classList.remove('editando');
    }
  };

  const handleDeleteJuego = async (juegoId) => {
    const juego = juegos.find(j => j.id === juegoId);
    if (confirm(`¿Estás seguro de que deseas desterrar "${juego?.titulo}" de tu biblioteca?`)) {
      const elemento = document.getElementById(`juego-${juegoId}`);
      elemento?.classList.add('destierro');
      try {
        await fetch(`http://localhost:3000/api/juegos/${juegoId}`, { method: 'DELETE' });
        setJuegos(juegos.filter(j => j.id !== juegoId));
      } catch (err) {
        console.error('Error al eliminar juego:', err);
        elemento?.classList.remove('destierro');
        alert('❌ Error al eliminar el juego. Por favor, intenta nuevamente.');
      }
    }
  };

  const handleAddJuego = () => {
    alert('⚔️ Redirigiendo al forjador de leyendas...');
    // Aquí podrías usar React Router para navegar a un formulario
  };

  const handleSortChange = (newSort, event) => {
    setSortBy(newSort);
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    event?.target?.classList.add('active');
  };

  const handleRetryLoad = () => {
    cargarJuegos();
  };

  const getTempleGreeting = () =>
    isDarkMode ? "Bienvenido al Santuario Nocturno de Hécate" : "Bienvenido al Templo Radiante de Apolo";

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

  // Renderizado de error
  if (error && juegos.length === 0) {
    return (
      <div className="santuario-error">
        <div className="error-oraculo">
          <div className="error-emblema">⚡</div>
          <h2 className="epic-text">¡Por los Dioses! Ocurrió un Error</h2>
          <p className="error-mensaje">{error}</p>
          <p className="error-descripcion">
            Se están usando datos de ejemplo. Tu santuario funcionará, pero los cambios no se guardarán.
          </p>
          <button 
            className="btn btn-epic btn-reintentar"
            onClick={handleRetryLoad}
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Reintentar Conexión</span>
          </button>
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
        
        {/* Indicador de estado de conexión */}
        {error && (
          <div className="connection-warning">
            <span className="warning-icon">⚠️</span>
            Modo sin conexión - Usando datos locales
          </div>
        )}
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
                      onClick={(e) => handleSortChange(option.key, e)}
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