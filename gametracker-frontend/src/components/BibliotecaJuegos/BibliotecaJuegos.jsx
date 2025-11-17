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
  const [editingJuego, setEditingJuego] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar juegos desde la API
  const cargarJuegos = async () => {
    try {
      setLoading(true);
      setError(null);
      const respuesta = await fetch('http://localhost:3000/api/juegos');
      
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: No se pudieron cargar los juegos`);
      }
      
      const datos = await respuesta.json();
      
      // Transformar datos de la API al formato esperado por el componente
      const juegosTransformados = datos.map(juego => ({
        id: juego._id,
        titulo: juego.nombre,
        portada: juego.portadaURL || '/placeholder-game.jpg',
        completado: juego.estado === 'Completado',
        horas: juego.horasJugadas || 0,
        rating: juego.rating || 0,
        genero: juego.genero || 'Sin género',
        plataforma: juego.plataforma || 'Desconocida',
        dios: juego.dios || 'Apolo',
        fechaAdquisicion: juego.fechaAdquisicion || new Date().toISOString().split('T')[0],
        ultimaSesion: juego.ultimaSesion || new Date().toISOString().split('T')[0],
        tags: juego.tags || [],
        descripcion: juego.descripcion || ''
      }));
      
      setJuegos(juegosTransformados);
    } catch (err) {
      console.error('Error al cargar juegos:', err);
      setError(err.message);
      // En caso de error, usar array vacío
      setJuegos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // Función para agregar nuevo juego
  const handleAddJuego = async (nuevoJuego) => {
    try {
      // Preparar datos para la API
      const juegoData = {
        nombre: nuevoJuego.titulo,
        plataforma: nuevoJuego.plataforma,
        genero: nuevoJuego.genero,
        horasJugadas: parseInt(nuevoJuego.horas) || 0,
        rating: parseInt(nuevoJuego.rating) || 0,
        estado: nuevoJuego.completado ? 'Completado' : 'Pendiente',
        dios: nuevoJuego.dios,
        fechaAdquisicion: nuevoJuego.fechaAdquisicion,
        portadaURL: nuevoJuego.portadaURL || '',
        tags: nuevoJuego.tags || [],
        descripcion: nuevoJuego.descripcion || '',
        ultimaSesion: new Date().toISOString().split('T')[0]
      };

      const respuesta = await fetch('http://localhost:3000/api/juegos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegoData)
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.error || 'Error al crear el juego');
      }

      const juegoCreado = await respuesta.json();
      
      // Transformar y agregar a la lista
      const juegoTransformado = {
        id: juegoCreado._id,
        titulo: juegoCreado.nombre,
        portada: juegoCreado.portadaURL || '/placeholder-game.jpg',
        completado: juegoCreado.estado === 'Completado',
        horas: juegoCreado.horasJugadas || 0,
        rating: juegoCreado.rating || 0,
        genero: juegoCreado.genero || 'Sin género',
        plataforma: juegoCreado.plataforma || 'Desconocida',
        dios: juegoCreado.dios || 'Apolo',
        fechaAdquisicion: juegoCreado.fechaAdquisicion || new Date().toISOString().split('T')[0],
        ultimaSesion: juegoCreado.ultimaSesion || new Date().toISOString().split('T')[0],
        tags: juegoCreado.tags || [],
        descripcion: juegoCreado.descripcion || ''
      };

      setJuegos(prev => [juegoTransformado, ...prev]);
      setShowForm(false);
      
      alert(`¡Leyenda forjada! "${juegoCreado.nombre}" ha sido añadido a tu biblioteca.`);
      
    } catch (error) {
      console.error('Error al crear juego:', error);
      alert(`❌ Error al crear el juego: ${error.message}`);
    }
  };

  // Estadísticas calculadas en tiempo real
  const estadisticas = useMemo(() => {
    const juegosCompletados = juegos.filter(j => j.completado).length;
    const totalHoras = juegos.reduce((acc, j) => acc + j.horas, 0);
    const juegosConRating = juegos.filter(j => j.rating > 0);
    const ratingPromedio = juegosConRating.length > 0
      ? (juegosConRating.reduce((acc, j) => acc + j.rating, 0) / juegosConRating.length).toFixed(1)
      : '0.0';
    const juegosApolo = juegos.filter(j => j.dios === 'Apolo').length;
    const juegosHecate = juegos.filter(j => j.dios === 'Hécate').length;
    const juegosAmbos = juegos.filter(j => j.dios === 'Ambos').length;
    
    return { 
      juegosCompletados, 
      totalHoras, 
      ratingPromedio, 
      juegosApolo, 
      juegosHecate, 
      juegosAmbos,
      totalJuegos: juegos.length
    };
  }, [juegos]);

  // Filtrado y ordenamiento optimizado
  const juegosFiltrados = useMemo(() => {
    let filtrados = juegos.filter(juego => {
      // Filtro por estado/dios
      const coincideFiltro =
        filter === 'todos' ? true :
        filter === 'completados' ? juego.completado :
        filter === 'apolo' ? juego.dios === 'Apolo' :
        filter === 'hecate' ? juego.dios === 'Hécate' :
        juego.dios === 'Ambos';
      
      // Filtro por búsqueda
      const coincideBusqueda =
        searchTerm === '' ||
        juego.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        juego.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        juego.plataforma.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (juego.tags && juego.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (juego.descripcion && juego.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return coincideFiltro && coincideBusqueda;
    });

    // Ordenamiento
    return filtrados.sort((a, b) => {
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

  // Función para editar juego
  const handleEditJuego = async (juegoEditado) => {
    try {
      const elemento = document.getElementById(`juego-${juegoEditado.id}`);
      elemento?.classList.add('editando');
      
      // Preparar datos para la API
      const datosActualizados = {
        nombre: juegoEditado.titulo,
        plataforma: juegoEditado.plataforma,
        genero: juegoEditado.genero,
        horasJugadas: juegoEditado.horas,
        rating: juegoEditado.rating,
        estado: juegoEditado.completado ? 'Completado' : 'Pendiente',
        dios: juegoEditado.dios,
        fechaAdquisicion: juegoEditado.fechaAdquisicion,
        portadaURL: juegoEditado.portada,
        tags: juegoEditado.tags || [],
        descripcion: juegoEditado.descripcion || '',
        ultimaSesion: juegoEditado.ultimaSesion || new Date().toISOString().split('T')[0]
      };

      const respuesta = await fetch(`http://localhost:3000/api/juegos/${juegoEditado.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.error || 'Error al actualizar el juego');
      }

      const juegoActualizado = await respuesta.json();
      
      // Transformar respuesta
      const juegoTransformado = {
        id: juegoActualizado._id,
        titulo: juegoActualizado.nombre,
        portada: juegoActualizado.portadaURL || '/placeholder-game.jpg',
        completado: juegoActualizado.estado === 'Completado',
        horas: juegoActualizado.horasJugadas || 0,
        rating: juegoActualizado.rating || 0,
        genero: juegoActualizado.genero || 'Sin género',
        plataforma: juegoActualizado.plataforma || 'Desconocida',
        dios: juegoActualizado.dios || 'Apolo',
        fechaAdquisicion: juegoActualizado.fechaAdquisicion || new Date().toISOString().split('T')[0],
        ultimaSesion: juegoActualizado.ultimaSesion || new Date().toISOString().split('T')[0],
        tags: juegoActualizado.tags || [],
        descripcion: juegoActualizado.descripcion || ''
      };

      // Actualizar estado local
      setJuegos(prev => prev.map(j => 
        j.id === juegoTransformado.id ? juegoTransformado : j
      ));
      
      setEditingJuego(null);
      
      setTimeout(() => {
        elemento?.classList.remove('editando');
        alert(`✅ Las crónicas de "${juegoTransformado.titulo}" han sido actualizadas`);
      }, 800);
      
    } catch (err) {
      console.error('Error al editar juego:', err);
      const elemento = document.getElementById(`juego-${juegoEditado.id}`);
      elemento?.classList.remove('editando');
      alert(`❌ Error al actualizar el juego: ${err.message}`);
    }
  };

  // Función para eliminar juego
  const handleDeleteJuego = async (juegoId) => {
    const juego = juegos.find(j => j.id === juegoId);
    
    if (!juego) return;
    
    if (confirm(`¿Estás seguro de que deseas desterrar "${juego.titulo}" de tu biblioteca?`)) {
      const elemento = document.getElementById(`juego-${juegoId}`);
      elemento?.classList.add('destierro');
      
      try {
        const respuesta = await fetch(`http://localhost:3000/api/juegos/${juegoId}`, { 
          method: 'DELETE' 
        });

        if (!respuesta.ok) {
          const errorData = await respuesta.json();
          throw new Error(errorData.error || 'Error al eliminar el juego');
        }

        // Actualizar estado local
        setJuegos(prev => prev.filter(j => j.id !== juegoId));
        
        setTimeout(() => {
          alert(`🗑️ "${juego.titulo}" ha sido desterrado del santuario`);
        }, 300);
        
      } catch (err) {
        console.error('Error al eliminar juego:', err);
        elemento?.classList.remove('destierro');
        alert(`❌ Error al eliminar el juego: ${err.message}`);
      }
    }
  };

  // Función para iniciar edición
  const handleStartEdit = (juego) => {
    setEditingJuego(juego);
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setEditingJuego(null);
  };

  // Función para recargar datos
  const handleRetryLoad = () => {
    cargarJuegos();
  };

  // Función para mostrar/ocultar formulario
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Función para cerrar formulario
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Función para actualizar última sesión
  const handleUpdateLastSession = async (juegoId) => {
    try {
      const datosActualizados = {
        ultimaSesion: new Date().toISOString().split('T')[0]
      };

      const respuesta = await fetch(`http://localhost:3000/api/juegos/${juegoId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar última sesión');
      }

      // Actualizar estado local
      setJuegos(prev => prev.map(j => 
        j.id === juegoId 
          ? { ...j, ultimaSesion: datosActualizados.ultimaSesion }
          : j
      ));

    } catch (err) {
      console.error('Error al actualizar última sesión:', err);
    }
  };

  // Mensajes temáticos
  const getTempleGreeting = () =>
    isDarkMode 
      ? "Bienvenido al Santuario Nocturno de Hécate" 
      : "Bienvenido al Templo Radiante de Apolo";

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

  // Renderizado de carga
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
            No se pudieron cargar los juegos desde el servidor.
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
      {/* Header épico del templo */}
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
        
        {/* Indicador de estado */}
        {error && (
          <div className="connection-warning">
            <span className="warning-icon">⚠️</span>
            Error de conexión - Los datos pueden no estar actualizados
          </div>
        )}
      </header>

      {/* Estadísticas */}
      <div className="divine-stats">
        <div className="oracle-cards">
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">📜</div>
            <h3>Total de Leyendas</h3>
            <span className="oracle-number">{estadisticas.totalJuegos}</span>
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

      {/* Panel de control */}
      <div className="control-panel">
        <div className="control-container">
          {/* Búsqueda */}
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
                      onClick={() => setSortBy(option.key)}
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

      {/* Lista de juegos */}
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
              onClick={handleShowForm}
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
                : 'Comienza agregando tu primera leyenda al santuario.'
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
              <button 
                className="btn btn-magic"
                onClick={handleShowForm}
              >
                ⚔️ Forjar Primera Leyenda
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Grid de juegos */}
            <div className="sacred-grid">
              {juegosFiltrados.map(juego => (
                <div key={juego.id} id={`juego-${juego.id}`} className="game-item">
                  <TarjetaJuego 
                    juego={juego}
                    onEdit={handleEditJuego}
                    onDelete={handleDeleteJuego}
                    isEditing={editingJuego?.id === juego.id}
                    onStartEdit={handleStartEdit}
                    onCancelEdit={handleCancelEdit}
                    onUpdateLastSession={handleUpdateLastSession}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Footer */}
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
              {estadisticas.totalJuegos} Leyendas
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

      {/* Modal para agregar nuevo juego */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="epic-text">⚔️ Forjar Nueva Leyenda</h3>
              <button className="modal-close" onClick={handleCloseForm}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* Aquí iría el componente FormularioJuego */}
              <p className="modal-message">
                El forjador de leyendas se está preparando...
                <br />
                <small>Esta funcionalidad estará disponible pronto</small>
              </p>
              <div className="modal-actions">
                <button className="btn btn-epic" onClick={handleCloseForm}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibliotecaJuegos;