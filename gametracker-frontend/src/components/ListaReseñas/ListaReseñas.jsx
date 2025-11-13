import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ListaReseñas.css';

const ListaReseñas = () => {
  const { isDarkMode, themeName } = useTheme();
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');
  const [sortBy, setSortBy] = useState('fecha');
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Simular carga de reseñas épicas
    const timer = setTimeout(() => {
      setReseñas([
        {
          id: 1,
          juego: 'The Legend of Zelda: Breath of the Wild',
          juegoId: 1,
          autor: 'Link el Héroe',
          rating: 5,
          fecha: '2024-01-20',
          titulo: 'Una odisea que redefine la aventura',
          contenido: 'Hyrule nunca se había sentido tan vivo. Cada montaña escalada, cada santuario completado, cada Korok encontrado... es una experiencia mágica. La libertad absoluta que ofrece este juego es simplemente revolucionaria.',
          horasJugadas: 85,
          completado: true,
          plataforma: 'Nintendo Switch',
          dios: 'Apolo',
          likes: 42,
          tags: ['Aventura Épica', 'Mundo Abierto', 'Revolucionario']
        },
        {
          id: 2,
          juego: 'Hollow Knight',
          juegoId: 2,
          autor: 'Cazador de Sombras',
          rating: 4,
          fecha: '2024-01-18',
          titulo: 'La belleza en la oscuridad',
          contenido: 'Hallownest es un mundo increíblemente detallado y atmosférico. El combate es preciso, la exploración gratificante, y la historia... misteriosa y conmovedora. Una obra maestra del género.',
          horasJugadas: 42,
          completado: false,
          plataforma: 'PC',
          dios: 'Hécate',
          likes: 28,
          tags: ['Metroidvania', 'Atmosférico', 'Desafiante']
        },
        // ... más reseñas
      ]);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLike = (reseñaId) => {
    setReseñas(prev => prev.map(reseña => 
      reseña.id === reseñaId 
        ? { ...reseña, likes: reseña.likes + 1, liked: true }
        : reseña
    ));
    
    // Efecto visual
    const likeBtn = document.querySelector(`#like-${reseñaId}`);
    likeBtn?.classList.add('liked');
    setTimeout(() => likeBtn?.classList.remove('liked'), 600);
  };

  const handleEditReseña = (reseña) => {
    console.log('Editando reseña:', reseña);
    alert(`✍️ Editando las crónicas de: ${reseña.juego}`);
  };

  const handleDeleteReseña = (reseñaId) => {
    const reseña = reseñas.find(r => r.id === reseñaId);
    if (confirm(`¿Estás seguro de que deseas borrar la reseña de "${reseña?.juego}"?`)) {
      setReseñas(reseñas.filter(r => r.id !== reseñaId));
    }
  };

  // Estadísticas épicas
  const totalReseñas = reseñas.length;
  const promedioRating = reseñas.length > 0 
    ? (reseñas.reduce((total, reseña) => total + reseña.rating, 0) / reseñas.length).toFixed(1)
    : '0.0';
  const totalLikes = reseñas.reduce((total, reseña) => total + reseña.likes, 0);
  const reseñasApolo = reseñas.filter(r => r.dios === 'Apolo').length;
  const reseñasHecate = reseñas.filter(r => r.dios === 'Hécate').length;

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
    if (isMobile && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

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
              {['todas', 'apolo', 'hecate', 'ambos'].map(option => (
                <button
                  key={option}
                  className={`filter-btn ${filter === option ? 'activo' : ''}`}
                  onClick={() => setFilter(option)}
                >
                  {option === 'todas' && (isMobile ? '🌟 Todas' : '🌟 Todas')}
                  {option === 'apolo' && (isMobile ? '☀️ Apolo' : '☀️ Apolo')}
                  {option === 'hecate' && (isMobile ? '🌙 Hécate' : '🌙 Hécate')}
                  {option === 'ambos' && (isMobile ? '⚡ Ambos' : '⚡ Ambos')}
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
            <h3>El Salón está Vacío</h3>
            <p>No se encontraron crónicas con los filtros seleccionados</p>
            <button 
              className="btn btn-epic"
              onClick={() => setFilter('todas')}
            >
              🌟 {isMobile ? 'Mostrar Todas' : 'Mostrar Todas las Crónicas'}
            </button>
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
                    {truncateText(reseña.titulo, isMobile ? 40 : 60)}
                  </h4>
                  <p className="reseña-texto">
                    {truncateText(reseña.contenido, isMobile ? 120 : 200)}
                  </p>
                  
                  {/* Tags de la reseña */}
                  <div className="reseña-tags">
                    {reseña.tags.slice(0, isMobile ? 2 : 3).map(tag => (
                      <span key={tag} className="reseña-tag">
                        #{isMobile ? tag.split(' ')[0] : tag}
                      </span>
                    ))}
                    {reseña.tags.length > (isMobile ? 2 : 3) && (
                      <span className="reseña-tag">
                        +{reseña.tags.length - (isMobile ? 2 : 3)}
                      </span>
                    )}
                  </div>
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
                    <button className="btn-action btn-share">
                      <span className="action-icon">📤</span>
                      {isMobile ? '' : 'Compartir'}
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
    'Multiplataforma': 'Multi'
  };
  return shortNames[platform] || platform;
};

export default ListaReseñas;