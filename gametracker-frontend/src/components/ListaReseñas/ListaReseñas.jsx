import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ListaReseñas.css';

const ListaReseñas = () => {
  const { isDarkMode, themeName } = useTheme();
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');
  const [sortBy, setSortBy] = useState('fecha');

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
        {
          id: 3,
          juego: 'God of War',
          juegoId: 3,
          autor: 'Kratos el Fantasma',
          rating: 5,
          fecha: '2024-01-15',
          titulo: 'Paternidad y dioses en un viaje épico',
          contenido: 'La evolución de Kratos de dios de la guerra a padre es una de las narrativas más poderosas en los videojuegos. El combate es visceral, los personajes memorables, y el mundo nórdico es impresionante.',
          horasJugadas: 35,
          completado: true,
          plataforma: 'PlayStation',
          dios: 'Apolo',
          likes: 56,
          tags: ['Narrativa', 'Combate Épico', 'Evolución']
        },
        {
          id: 4,
          juego: 'Bloodborne',
          juegoId: 4,
          autor: 'Cazador de Pesadillas',
          rating: 5,
          fecha: '2024-01-12',
          titulo: 'Una pesadilla de la que no quieres despertar',
          contenido: 'Yharnam es una obra maestra del horror gótico. El combate agresivo recompensa la valentía, la atmósfera es opresiva y fascinante, y los jefes... inolvidables. Fear the old blood.',
          horasJugadas: 68,
          completado: false,
          plataforma: 'PlayStation',
          dios: 'Hécate',
          likes: 39,
          tags: ['Horror Gótico', 'Desafiante', 'Atmosférico']
        },
        {
          id: 5,
          juego: 'Hades',
          juegoId: 5,
          autor: 'Zagreus el Príncipe',
          rating: 5,
          fecha: '2024-01-22',
          titulo: 'Morir nunca fue tan divertido',
          contenido: 'Cada escape del Inframundo cuenta una historia. La combinación perfecta de narrativa y jugabilidad roguelike. Los personajes son carismáticos, el combate fluido, y la progresión... simplemente adictiva.',
          horasJugadas: 92,
          completado: true,
          plataforma: 'Multiplataforma',
          dios: 'Ambos',
          likes: 67,
          tags: ['Roguelike', 'Mitología', 'Adictivo']
        }
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
          <h1 className="epic-text gold-text text-glow">📜 CRÓNICAS DE HÉROES</h1>
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
            <h3>Total de Crónicas</h3>
            <span className="oracle-number">{totalReseñas}</span>
            <div className="oracle-subtitle">Historias Compartidas</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">⭐</div>
            <h3>Gloria Promedio</h3>
            <span className="oracle-number">{promedioRating}/5</span>
            <div className="oracle-subtitle">Estrellas Divinas</div>
          </div>
          <div className="oracle-card glow-on-hover">
            <div className="oracle-icon">❤️</div>
            <h3>Sabiduría Apreciada</h3>
            <span className="oracle-number">{totalLikes}</span>
            <div className="oracle-subtitle">Corazones Ganados</div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">☀️</div>
            <h3>Crónicas de Apolo</h3>
            <span className="oracle-number">{reseñasApolo}</span>
            <div className="oracle-subtitle">Historias de Luz</div>
          </div>
          <div className="oracle-card god-card glow-on-hover">
            <div className="oracle-icon">🌙</div>
            <h3>Secretos de Hécate</h3>
            <span className="oracle-number">{reseñasHecate}</span>
            <div className="oracle-subtitle">Misterios Nocturnos</div>
          </div>
        </div>
      </div>

      {/* Filtros y ordenamiento épicos */}
      <div className="chronicle-controls">
        <div className="controls-container">
          <div className="control-group">
            <h4 className="control-title">🔮 Filtro del Oráculo</h4>
            <div className="filter-options">
              {['todas', 'apolo', 'hecate', 'ambos'].map(option => (
                <button
                  key={option}
                  className={`filter-btn ${filter === option ? 'activo' : ''}`}
                  onClick={() => setFilter(option)}
                >
                  {option === 'todas' && '🌟 Todas'}
                  {option === 'apolo' && '☀️ Apolo'}
                  {option === 'hecate' && '🌙 Hécate'}
                  {option === 'ambos' && '⚡ Ambos'}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h4 className="control-title">📊 Orden del Destino</h4>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="fecha">📅 Más Recientes</option>
              <option value="rating">⭐ Mejor Calificadas</option>
              <option value="likes">❤️ Más Populares</option>
              <option value="horas">⏱️ Más Horas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de reseñas épicas */}
      <section className="chronicles-grid">
        <div className="chronicles-header">
          <h2 className="epic-text text-glow">🖋️ SALÓN DE LAS CRÓNICAS</h2>
          <p className="chronicles-subtitle">
            Mostrando {reseñasFiltradas.length} de {reseñas.length} crónicas
            {filter !== 'todas' && ` • Filtrado por: ${filter}`}
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
              🌟 Mostrar Todas las Crónicas
            </button>
          </div>
        ) : (
          <div className="reseñas-list">
            {reseñasFiltradas.map(reseña => (
              <div key={reseña.id} className="reseña-card">
                {/* Header de la reseña */}
                <div className="reseña-header">
                  <div className="reseña-meta">
                    <h3 className="juego-titulo">{reseña.juego}</h3>
                    <div className="reseña-author">
                      <span className="author-avatar">👤</span>
                      <span className="author-name">{reseña.autor}</span>
                      <span className="review-date">{new Date(reseña.fecha).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  <div className="reseña-badges">
                    <div className={`badge god-badge ${reseña.dios.toLowerCase()}`}>
                      {reseña.dios === 'Apolo' ? '☀️' : reseña.dios === 'Hécate' ? '🌙' : '⚡'}
                      {reseña.dios}
                    </div>
                    <div className="rating-badge">
                      {'⭐'.repeat(reseña.rating)}
                      <span className="rating-number">{reseña.rating}/5</span>
                    </div>
                  </div>
                </div>

                {/* Contenido de la reseña */}
                <div className="reseña-content">
                  <h4 className="reseña-titulo">{reseña.titulo}</h4>
                  <p className="reseña-texto">{reseña.contenido}</p>
                  
                  {/* Tags de la reseña */}
                  <div className="reseña-tags">
                    {reseña.tags.map(tag => (
                      <span key={tag} className="reseña-tag">#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Estadísticas de la reseña */}
                <div className="reseña-stats">
                  <div className="stat-item">
                    <span className="stat-icon">⏱️</span>
                    <span className="stat-value">{reseña.horasJugadas}h</span>
                    <span className="stat-label">de Experiencia</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-icon">🎮</span>
                    <span className="stat-value">{reseña.plataforma}</span>
                    <span className="stat-label">Plataforma</span>
                  </div>
                  
                  <div className="stat-item">
                    <span className="stat-icon">{reseña.completado ? '✅' : '⏳'}</span>
                    <span className="stat-value">
                      {reseña.completado ? 'Completado' : 'En Progreso'}
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
                      Editar
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteReseña(reseña.id)}
                    >
                      <span className="action-icon">🗑️</span>
                      Eliminar
                    </button>
                    <button className="btn-action btn-share">
                      <span className="action-icon">📤</span>
                      Compartir
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
            <span className="altar-stat">📜 {totalReseñas} Crónicas</span>
            <span className="altar-stat">⭐ {promedioRating} Estrellas</span>
            <span className="altar-stat">❤️ {totalLikes} Bendiciones</span>
            <span className="altar-stat">👥 {reseñas.length} Héroes</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ListaReseñas;