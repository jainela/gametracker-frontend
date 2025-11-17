import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ListaReseñas.css';

const ListaReseñas = () => {
  const { isDarkMode, themeName } = useTheme();
  const [reseñas, setReseñas] = useState([]);
  const [juegos, setJuegos] = useState({}); // Para mapear juegoId a nombre
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');
  const [sortBy, setSortBy] = useState('fecha');
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cargar reseñas y juegos desde la API
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Cargar reseñas y juegos simultáneamente
        const [reseñasRes, juegosRes] = await Promise.all([
          fetch('http://localhost:3000/api/resenas'),
          fetch('http://localhost:3000/api/juegos')
        ]);

        if (!reseñasRes.ok) throw new Error('Error al cargar reseñas');
        if (!juegosRes.ok) throw new Error('Error al cargar juegos');

        const reseñasData = await reseñasRes.json();
        const juegosData = await juegosRes.json();

        // Crear mapa de juegos para buscar nombres
        const juegosMap = {};
        juegosData.forEach(juego => {
          juegosMap[juego._id] = juego.nombre;
        });

        // Transformar datos de reseñas
        const reseñasTransformadas = reseñasData.map(reseña => ({
          id: reseña._id,
          juego: reseña.juego, // Nombre del juego (string)
          juegoId: reseña.juegoId, // ID del juego para referencia
          autor: reseña.autor || 'Anónimo',
          rating: reseña.rating || 0,
          fecha: reseña.fecha || new Date().toISOString().split('T')[0],
          titulo: reseña.titulo || 'Sin título',
          contenido: reseña.contenido || '',
          horasJugadas: reseña.horasJugadas || 0,
          completado: reseña.completado || false,
          plataforma: reseña.plataforma || 'No especificada',
          dios: reseña.dios || 'Apolo',
          likes: reseña.likes || 0,
          tags: reseña.tags || [],
          liked: false // Estado local para like
        }));

        setReseñas(reseñasTransformadas);
        setJuegos(juegosMap);

      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError(err.message);
        setReseñas([]); // Resetear a array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Función para dar like a una reseña
  const handleLike = async (reseñaId) => {
    try {
      const reseña = reseñas.find(r => r.id === reseñaId);
      if (!reseña) return;

      // Actualizar localmente primero para mejor UX
      setReseñas(prev => prev.map(reseña => 
        reseña.id === reseñaId 
          ? { ...reseña, likes: reseña.likes + 1, liked: true }
          : reseña
      ));

      // Efecto visual
      const likeBtn = document.querySelector(`#like-${reseñaId}`);
      likeBtn?.classList.add('liked');
      setTimeout(() => likeBtn?.classList.remove('liked'), 600);

      // Actualizar en el backend
      await fetch(`http://localhost:3000/api/resenas/${reseñaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: reseña.likes + 1 })
      });

    } catch (err) {
      console.error('Error al dar like:', err);
      // Revertir cambios en caso de error
      setReseñas(prev => prev.map(reseña => 
        reseña.id === reseñaId 
          ? { ...reseña, likes: reseña.likes - 1, liked: false }
          : reseña
      ));
    }
  };

  // Función para editar reseña
  const handleEditReseña = (reseña) => {
    console.log('Editando reseña:', reseña);
    // En una implementación completa, aquí abrirías un modal o redirigirías
    alert(`✍️ Redirigiendo para editar: "${reseña.titulo}"`);
  };

  // Función para eliminar reseña
  const handleDeleteReseña = async (reseñaId) => {
    const reseña = reseñas.find(r => r.id === reseñaId);
    if (!reseña) return;

    if (confirm(`¿Estás seguro de que deseas borrar la reseña "${reseña.titulo}"?`)) {
      try {
        const response = await fetch(`http://localhost:3000/api/resenas/${reseñaId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Eliminar localmente
          setReseñas(prev => prev.filter(r => r.id !== reseñaId));
        } else {
          throw new Error('Error al eliminar la reseña');
        }
      } catch (err) {
        console.error('Error al eliminar reseña:', err);
        alert('❌ Error al eliminar la reseña. Por favor, intenta nuevamente.');
      }
    }
  };

  // Función para recargar datos
  const handleRetryLoad = () => {
    window.location.reload(); // Recarga simple para reintentar
  };

  // Estadísticas épicas
  const totalReseñas = reseñas.length;
  const reseñasConRating = reseñas.filter(r => r.rating > 0);
  const promedioRating = reseñasConRating.length > 0 
    ? (reseñasConRating.reduce((total, reseña) => total + reseña.rating, 0) / reseñasConRating.length).toFixed(1)
    : '0.0';
  const totalLikes = reseñas.reduce((total, reseña) => total + reseña.likes, 0);
  const reseñasApolo = reseñas.filter(r => r.dios === 'Apolo').length;
  const reseñasHecate = reseñas.filter(r => r.dios === 'Hécate').length;
  const reseñasAmbos = reseñas.filter(r => r.dios === 'Ambos').length;

  // Filtrado y ordenamiento
  const reseñasFiltradas = reseñas
    .filter(reseña => 
      filter === 'todas' ? true :
      filter === 'apolo' ? reseña.dios === 'Apolo' :
      filter === 'hecate' ? reseña.dios === 'Hécate' :
      reseña.dios === 'Ambos'
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'fecha': return new Date(b.fecha) - new Date(a.fecha);
        case 'rating': return b.rating - a.rating;
        case 'likes': return b.likes - a.likes;
        case 'horas': return b.horasJugadas - a.horasJugadas;
        default: return 0;
      }
    });

  const getTempleQuote = () => {
    return isDarkMode 
      ? "Las crónicas de la noche revelan verdades ocultas"
      : "Bajo la luz del sol, las historias alcanzan la inmortalidad";
  };

  const getRandomWisdom = () => {
    const wisdoms = [
      "Cada reseña es un eco en el salón de los héroes",
      "Las palabras tienen poder, úsalas con sabiduría",
      "Tu experiencia puede guiar a otros aventureros",
      "Compartir tu viaje enriquece a toda la comunidad"
    ];
    return wisdoms[Math.floor(Math.random() * wisdoms.length)];
  };

  // Función para truncar texto en móvil
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (isMobile && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Renderizado de carga
  if (loading) {
    return (
      <div className="santuario-cargando">
        <div className="oraculo-cargando">
          <div className="esfera-carga glow-orb"></div>
          <h2 className="epic-text gold-text">Descifrando Crónicas...</h2>
          <p>Las reseñas de los héroes se revelan</p>
          <div className="runas-cargando">
            <span className="runa">📜</span>
            <span className="runa">✍️</span>
            <span className="runa">⭐</span>
          </div>
        </div>
      </div>
    );
  }

  // Renderizado de error
  if (error && reseñas.length === 0) {
    return (
      <div className="santuario-error">
        <div className="error-oraculo">
          <div className="error-emblema">⚡</div>
          <h2 className="epic-text">¡Por los Dioses! Ocurrió un Error</h2>
          <p className="error-mensaje">{error}</p>
          <p className="error-descripcion">
            No se pudieron cargar las reseñas desde el servidor.
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
    <div className="reseñas-container">
      {/* Header épico de crónicas */}
      <header className="reseñas-header">
        <div className="chronicle-banner">
          <h1 className="epic-text gold-text text-glow">
            {isMobile ? '📜 CRÓNICAS' : '📜 CRÓNICAS DE HÉROES'}
          </h1>
          <div className="chronicle-icon float-effect">🖋️</div>
        </div>
        <p className="temple-greeting">{getTempleQuote()}</p>
        <p className="wisdom-quote">"{getRandomWisdom()}"</p>
        
        {/* Indicador de error */}
        {error && (
          <div className="connection-warning">
            <span className="warning-icon">⚠️</span>
            Error de conexión - Los datos pueden no estar actualizados
          </div>
        )}
      </header>

      {/* Estadísticas de crónicas */}
      <div className="chronicle-stats">
        <div className="oracle-cards">
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">📜</div>
            <h3>{isMobile ? 'Crónicas' : 'Total de Crónicas'}</h3>
            <span className="oracle-number">{totalReseñas}</span>
            <div className="oracle-subtitle">
              {isMobile ? 'Historias' : 'Historias Compartidas'}
            </div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">⭐</div>
            <h3>{isMobile ? 'Gloria' : 'Gloria Promedio'}</h3>
            <span className="oracle-number">{promedioRating}/5</span>
            <div className="oracle-subtitle">
              {isMobile ? 'Estrellas' : 'Estrellas Divinas'}
            </div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">❤️</div>
            <h3>{isMobile ? 'Sabiduría' : 'Sabiduría Apreciada'}</h3>
            <span className="oracle-number">{totalLikes}</span>
            <div className="oracle-subtitle">
              {isMobile ? 'Corazones' : 'Corazones Ganados'}
            </div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">☀️</div>
            <h3>{isMobile ? 'Apolo' : 'Crónicas de Apolo'}</h3>
            <span className="oracle-number">{reseñasApolo}</span>
            <div className="oracle-subtitle">
              {isMobile ? 'Luz' : 'Historias de Luz'}
            </div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">🌙</div>
            <h3>{isMobile ? 'Hécate' : 'Secretos de Hécate'}</h3>
            <span className="oracle-number">{reseñasHecate}</span>
            <div className="oracle-subtitle">
              {isMobile ? 'Noche' : 'Misterios Nocturnos'}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y ordenamiento épicos */}
      <div className="chronicle-controls">
        <div className="controls-container">
          <div className="control-group">
            <h4 className="control-title">
              {isMobile ? '🔮 Filtro' : '🔮 Filtro del Oráculo'}
            </h4>
            <div className="filter-options">
              {[
                { key: 'todas', label: '🌟 Todas', mobileLabel: '🌟 Todas' },
                { key: 'apolo', label: '☀️ Apolo', mobileLabel: '☀️ Apolo' },
                { key: 'hecate', label: '🌙 Hécate', mobileLabel: '🌙 Hécate' },
                { key: 'ambos', label: '⚡ Ambos', mobileLabel: '⚡ Ambos' }
              ].map(option => (
                <button
                  key={option.key}
                  className={`filter-btn ${filter === option.key ? 'activo' : ''}`}
                  onClick={() => setFilter(option.key)}
                >
                  {isMobile ? option.mobileLabel : option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h4 className="control-title">
              {isMobile ? '📊 Orden' : '📊 Orden del Destino'}
            </h4>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="fecha">
                {isMobile ? '📅 Recientes' : '📅 Más Recientes'}
              </option>
              <option value="rating">
                {isMobile ? '⭐ Mejores' : '⭐ Mejor Calificadas'}
              </option>
              <option value="likes">
                {isMobile ? '❤️ Populares' : '❤️ Más Populares'}
              </option>
              <option value="horas">
                {isMobile ? '⏱️ Más Horas' : '⏱️ Más Horas Jugadas'}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de reseñas épicas */}
      <section className="chronicles-grid">
        <div className="chronicles-header">
          <h2 className="epic-text text-glow">
            {isMobile ? '🖋️ CRÓNICAS' : '🖋️ SALÓN DE LAS CRÓNICAS'}
          </h2>
          <p className="chronicles-subtitle">
            {isMobile 
              ? `${reseñasFiltradas.length} de ${reseñas.length} crónicas`
              : `Mostrando ${reseñasFiltradas.length} de ${reseñas.length} crónicas${filter !== 'todas' ? ` • Filtrado por: ${filter}` : ''}`
            }
          </p>
        </div>

        {reseñasFiltradas.length === 0 ? (
          <div className="empty-chronicles">
            <div className="empty-icon float-effect">📖</div>
            <h3>
              {reseñas.length === 0 ? 'El Salón está Vacío' : 'No hay crónicas con este filtro'}
            </h3>
            <p>
              {reseñas.length === 0 
                ? 'Aún no hay reseñas en el sistema. ¡Sé el primero en compartir tu experiencia!'
                : 'No se encontraron crónicas con los filtros seleccionados'
              }
            </p>
            <div className="empty-actions">
              <button 
                className="btn btn-epic"
                onClick={() => setFilter('todas')}
              >
                🌟 {isMobile ? 'Mostrar Todas' : 'Mostrar Todas las Crónicas'}
              </button>
              {reseñas.length === 0 && (
                <button 
                  className="btn btn-magic"
                  onClick={() => window.location.hash = 'agregar-reseña'}
                >
                  📖 {isMobile ? 'Escribir' : 'Escribir Primera Crónica'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="reseñas-list">
            {reseñasFiltradas.map(reseña => (
              <div key={reseña.id} className="reseña-card">
                {/* Header de la reseña */}
                <div className="reseña-header">
                  <div className="reseña-meta">
                    <h3 className="juego-titulo">
                      {truncateText(reseña.juego, isMobile ? 30 : 50)}
                    </h3>
                    <div className="reseña-author">
                      <span className="author-avatar">👤</span>
                      <span className="author-name">
                        {truncateText(reseña.autor, isMobile ? 15 : 25)}
                      </span>
                      <span className="review-date">
                        {new Date(reseña.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: isMobile ? 'numeric' : 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="reseña-badges">
                    <div className={`badge god-badge ${reseña.dios.toLowerCase()}`}>
                      {reseña.dios === 'Apolo' ? '☀️' : reseña.dios === 'Hécate' ? '🌙' : '⚡'}
                      {isMobile ? '' : ` ${reseña.dios}`}
                    </div>
                    <div className="rating-badge">
                      {'⭐'.repeat(reseña.rating)}
                      <span className="rating-number">{reseña.rating}/5</span>
                    </div>
                  </div>
                </div>

                {/* Contenido de la reseña */}
                <div className="reseña-content">
                  <h4 className="reseña-titulo">
                    {truncateText(reseña.titulo || 'Sin título', isMobile ? 40 : 60)}
                  </h4>
                  <p className="reseña-texto">
                    {truncateText(reseña.contenido || 'Esta reseña no tiene contenido.', isMobile ? 120 : 200)}
                  </p>
                  
                  {/* Tags de la reseña */}
                  {reseña.tags && reseña.tags.length > 0 && (
                    <div className="reseña-tags">
                      {reseña.tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
                        <span key={index} className="reseña-tag">
                          #{isMobile ? tag.split(' ')[0] : tag}
                        </span>
                      ))}
                      {reseña.tags.length > (isMobile ? 2 : 3) && (
                        <span className="reseña-tag">
                          +{reseña.tags.length - (isMobile ? 2 : 3)}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Estadísticas de la reseña */}
                <div className="reseña-stats">
                  <div className="stat-item">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-value">{reseña.horasJugadas}h</span>
                    <span className="stat-label">
                      {isMobile ? 'Exp.' : 'de Experiencia'}
                    </span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-icon">🎮</span>
                    <span className="stat-value">
                      {isMobile ? getPlatformShortName(reseña.plataforma) : reseña.plataforma}
                    </span>
                    <span className="stat-label">
                      {isMobile ? 'Plat.' : 'Plataforma'}
                    </span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-icon">{reseña.completado ? '✅' : '⏳'}</span>
                    <span className="stat-value">
                      {isMobile 
                        ? (reseña.completado ? 'Comp.' : 'Prog.')
                        : (reseña.completado ? 'Completado' : 'En Progreso')
                      }
                    </span>
                    <span className="stat-label">Estado</span>
                  </div>
                </div>

                {/* Acciones de la reseña */}
                <div className="reseña-actions">
                  <button 
                    id={`like-${reseña.id}`}
                    className={`btn-like ${reseña.liked ? 'liked' : ''}`}
                    onClick={() => handleLike(reseña.id)}
                  >
                    <span className="like-icon">❤️</span>
                    <span className="like-count">{reseña.likes}</span>
                  </button>
                  
                  <div className="action-buttons">
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => handleEditReseña(reseña)}
                    >
                      <span className="action-icon">✍️</span>
                      {isMobile ? '' : 'Editar'}
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteReseña(reseña.id)}
                    >
                      <span className="action-icon">🗑️</span>
                      {isMobile ? '' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Altar de la sabiduría */}
      <footer className="wisdom-altar">
        <div className="altar-content">
          <p className="wisdom-text text-glow">
            {isDarkMode 
              ? "Hécate susurra: 'Cada reseña es un hechizo de experiencia, cada like una bendición'" 
              : "Apolo proclama: 'Cada reseña es un canto de gloria, cada like una ovación'"
            }
          </p>
          <div className="altar-stats">
            <span className="altar-stat">📜 {totalReseñas} {isMobile ? 'Crón' : 'Crónicas'}</span>
            <span className="altar-stat">⭐ {promedioRating} {isMobile ? 'Est' : 'Estrellas'}</span>
            <span className="altar-stat">❤️ {totalLikes} {isMobile ? 'Ben' : 'Bendiciones'}</span>
            <span className="altar-stat">👥 {reseñas.length} {isMobile ? 'Héroes' : 'Héroes'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Función auxiliar para nombres cortos de plataformas
const getPlatformShortName = (platform) => {
  const shortNames = {
    'PC': 'PC',
    'PlayStation': 'PS',
    'Xbox': 'XB', 
    'Nintendo Switch': 'NS',
    'Multiplataforma': 'Multi',
    'No especificada': '?'
  };
  return shortNames[platform] || platform;
};

export default ListaReseñas;