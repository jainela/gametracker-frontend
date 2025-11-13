import React, { useState, useMemo, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEdit, onDelete, onViewDetails }) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Memoizar valores calculados para mejor performance
  const godData = useMemo(() => {
    const data = {
      'Apolo': { 
        icon: '☀️', 
        color: 'gold', 
        gradient: 'linear-gradient(135deg, var(--apolo-accent), transparent, var(--apolo-accent-hover))',
        class: 'apolo',
        blessings: ['Luz', 'Arte', 'Música', 'Profecía']
      },
      'Hécate': { 
        icon: '🌙', 
        color: 'purple', 
        gradient: 'linear-gradient(135deg, var(--hecate-accent), transparent, var(--hecate-accent-hover))',
        class: 'hecate',
        blessings: ['Magia', 'Misterio', 'Noche', 'Secretos']
      },
      'Ambos': { 
        icon: '⚡', 
        color: 'both', 
        gradient: 'linear-gradient(135deg, var(--apolo-accent), var(--hecate-accent), var(--apolo-accent-hover))',
        class: 'ambos',
        blessings: ['Equilibrio', 'Poder Dual', 'Armonía']
      }
    };
    return data[juego.dios] || { 
      icon: '🎮', 
      color: 'default', 
      gradient: 'linear-gradient(135deg, var(--accent), transparent, var(--accent-hover))',
      class: 'default',
      blessings: ['Aventura', 'Diversión']
    };
  }, [juego.dios]);

  const platformData = useMemo(() => {
    const platforms = {
      'PC': { 
        icon: '💻', 
        name: 'Computadora',
        class: 'pc',
        specs: ['Alto Rendimiento', 'Mods', 'Multitarea']
      },
      'PlayStation': { 
        icon: '🎮', 
        name: 'PlayStation',
        class: 'playstation',
        specs: ['Exclusivos', 'DualSense', '4K']
      },
      'Xbox': { 
        icon: '🎮', 
        name: 'Xbox',
        class: 'xbox',
        specs: ['Game Pass', 'Retrocompatibilidad', 'Xbox Live']
      },
      'Nintendo Switch': { 
        icon: '🎮', 
        name: 'Nintendo Switch',
        class: 'switch',
        specs: ['Portabilidad', 'Exclusivos Nintendo', 'Joy-Con']
      },
      'Multiplataforma': { 
        icon: '🌐', 
        name: 'Múltiples Plataformas',
        class: 'multi',
        specs: ['Cross-Play', 'Cross-Save', 'Universal']
      }
    };
    return platforms[juego.plataforma] || { 
      icon: '🎮', 
      name: juego.plataforma, 
      class: 'default',
      specs: ['Personalizado']
    };
  }, [juego.plataforma]);

  // Handlers optimizados con useCallback
  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    
    // Efecto visual de edición
    const card = e.currentTarget.closest('.tarjeta-juego');
    card?.classList.add('edit-mode');
    
    setTimeout(() => {
      card?.classList.remove('edit-mode');
      onEdit?.(juego);
    }, 600);
  }, [juego, onEdit]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    onDelete?.(juego.id);
  }, [juego.id, onDelete]);

  const handleViewDetails = useCallback((e) => {
    e.stopPropagation();
    onViewDetails?.(juego);
  }, [juego, onViewDetails]);

  const handleCardClick = useCallback(() => {
    setShowActions(prev => !prev);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  // Funciones de utilidad memoizadas
  const getStatusData = useMemo(() => {
    return juego.completado 
      ? { icon: '✅', text: 'Completado', class: 'completado' }
      : { icon: '⏳', text: 'En Progreso', class: 'progreso' };
  }, [juego.completado]);

  const getRatingStars = useMemo(() => {
    return '⭐'.repeat(juego.rating) + '☆'.repeat(5 - juego.rating);
  }, [juego.rating]);

  const calculateProgress = useMemo(() => {
    const maxHours = 100;
    const progress = Math.min((juego.horas / maxHours) * 100, 100);
    return {
      percentage: progress,
      text: `${Math.round(progress)}% de Maestría`,
      level: progress >= 90 ? 'maestro' : progress >= 70 ? 'avanzado' : progress >= 50 ? 'intermedio' : 'principiante'
    };
  }, [juego.horas]);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, []);

  const getPlaceholderImage = useMemo(() => {
    const baseColor = isDarkMode ? '1a1a2e' : 'fef9e7';
    const accentColor = isDarkMode ? '8b5cf6' : 'd4af37';
    return `https://via.placeholder.com/300x400/${baseColor}/${accentColor}?text=${encodeURIComponent(juego.titulo.substring(0, 20))}`;
  }, [isDarkMode, juego.titulo]);

  // Efectos de interacción mejorados
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  // Funciones para manejar tags
  const filterByTag = useCallback((tag) => {
    console.log(`Filtrando por tag: ${tag}`);
    alert(`🎯 Activando filtro épico: "${tag}"`);
  }, []);

  const removeTag = useCallback((gameId, tag) => {
    if (confirm(`¿Desterrar el tag "${tag}" de esta leyenda?`)) {
      console.log(`Eliminando tag: ${tag} del juego: ${gameId}`);
      alert(`🏷️ Tag "${tag}" desterrado con éxito`);
    }
  }, []);

  const addNewTag = useCallback((gameId) => {
    const newTag = prompt('🏷️ Ingresa un nuevo tag épico:');
    if (newTag && newTag.trim()) {
      console.log(`Agregando tag: ${newTag} al juego: ${gameId}`);
      alert(`✨ Nuevo tag agregado: "${newTag}"`);
    }
  }, []);

  const handleShareGame = useCallback((game) => {
    const shareText = `
🎮 *${game.titulo}* - Mi Leyenda Épica

⭐ Rating: ${game.rating}/5
⏱️ Horas: ${game.horas}h
✅ Estado: ${game.completado ? 'Completado' : 'En Progreso'}
🎯 Progreso: ${calculateProgress.text}
🏷️ Tags: ${game.tags?.join(', ') || 'Sin tags'}
✨ Dios: ${game.dios}

${game.completado ? '🏆 ¡Leyenda Consumada!' : '⚔️ ¡La aventura continúa!'}
    `.trim();

    if (navigator.share) {
      navigator.share({
        title: game.titulo,
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('📋 ¡Leyenda copiada al portapapeles! Compártela con otros héroes.');
    }
  }, [calculateProgress]);

  const showAdvancedStats = useCallback((game) => {
    const stats = `
📊 *ESTADÍSTICAS AVANZADAS - ${game.titulo}*

🎯 Nivel de Maestría: ${calculateProgress.level.toUpperCase()}
📈 Progreso: ${Math.round(calculateProgress.percentage)}%
⏱️ Eficiencia: ${(game.horas / (game.rating || 1)).toFixed(1)} horas/estrella
🏆 Logros: ${game.completado ? 'Leyenda Completada' : 'En camino a la gloria'}
📅 Antigüedad: ${Math.floor((new Date() - new Date(game.fechaAdquisicion)) / (1000 * 60 * 60 * 24))} días
✨ Bendición: ${game.dios}

${godData.blessings.slice(0, 2).map(blessing => `• ${blessing}`).join('\n')}
    `.trim();
    
    alert(stats);
  }, [calculateProgress, godData.blessings]);

  const viewAchievements = useCallback((game) => {
    const achievements = [
      game.completado && '🏆 Leyenda Consumada',
      game.horas > 50 && '⏱️ Maestro del Tiempo',
      game.rating >= 4 && '⭐ Crítico Épico',
      game.horas > 100 && '🎯 Devoción Absoluta',
      game.tags && game.tags.length >= 5 && '🏷️ Coleccionista de Tags',
      game.horas > 200 && '⚡ Dios del Gaming'
    ].filter(Boolean);
    
    const message = `
🏆 LOGROS DE ${game.titulo.toUpperCase()}

${achievements.length > 0 ? achievements.join('\n') : '🚀 Aún no hay logros desbloqueados\n¡Continúa tu aventura épica!'}

${achievements.length}/6 logros desbloqueados

${achievements.length >= 3 ? '✨ ¡Eres un verdadero héroe!' : '💪 Sigue forjando tu leyenda'}
    `.trim();
    
    alert(message);
  }, []);

  // Función para determinar el tipo de tag
  const getTagType = useCallback((tag) => {
    const tagTypes = {
      // Tags de género
      'Aventura': 'genre',
      'Acción': 'genre', 
      'RPG': 'genre',
      'Estrategia': 'genre',
      'Indie': 'genre',
      'Metroidvania': 'genre',
      'Roguelike': 'genre',
      'Horror': 'genre',
      
      // Tags de dificultad
      'Desafiante': 'difficulty',
      'Fácil': 'difficulty',
      'Difícil': 'difficulty',
      
      // Tags de estilo
      'Mundo Abierto': 'style',
      'Multijugador': 'style',
      'Cooperativo': 'style',
      'Exploración': 'style',
      'Puzles': 'style',
      
      // Tags de estado
      'Completado': 'status',
      'En Progreso': 'status',
      'Favorito': 'status'
    };
    
    return tagTypes[tag] || 'custom';
  }, []);

  // Función para obtener iconos de tags
  const getTagIcon = useCallback((tag) => {
    const tagIcons = {
      'Aventura': '🗺️',
      'Acción': '⚔️',
      'RPG': '🧙‍♂️',
      'Estrategia': '♟️',
      'Indie': '🌟',
      'Metroidvania': '🦇',
      'Roguelike': '🔁',
      'Horror': '👻',
      'Desafiante': '💀',
      'Fácil': '😊',
      'Difícil': '😈',
      'Mundo Abierto': '🌍',
      'Multijugador': '👥',
      'Cooperativo': '🤝',
      'Exploración': '🧭',
      'Puzles': '🧩',
      'Completado': '✅',
      'En Progreso': '⏳',
      'Favorito': '❤️',
      'Nintendo': '🎮',
      'PlayStation': '🎮',
      'Xbox': '🎮',
      'PC': '💻'
    };
    
    return tagIcons[tag] || '🏷️';
  }, []);

  // Renderizado de tags optimizado con más funcionalidades
  const renderTags = useMemo(() => {
    if (!juego.tags || juego.tags.length === 0) {
      return (
        <div className="tags-container empty-tags">
          <span 
            className="no-tags-message" 
            title="Agregar tags para mejor organización"
            onClick={(e) => {
              e.stopPropagation();
              addNewTag(juego.id);
            }}
          >
            🏷️ Sin etiquetas - Click para agregar
          </span>
        </div>
      );
    }
    
    const displayedTags = juego.tags.slice(0, 3); // Reducido para mobile
    const remainingTags = juego.tags.length - 3;
    
    return (
      <div className="tags-container">
        {displayedTags.map((tag, index) => (
          <span 
            key={index} 
            className={`game-tag ${getTagType(tag)}`}
            title={`Tag: ${tag} - Click para filtrar`}
            onClick={(e) => {
              e.stopPropagation();
              filterByTag(tag);
            }}
          >
            <span className="tag-icon">{getTagIcon(tag)}</span>
            <span className="tag-text">{tag}</span>
            <button 
              className="tag-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(juego.id, tag);
              }}
              title={`Eliminar tag: ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        {remainingTags > 0 && (
          <span 
            className="game-tag more-tags"
            title={`${remainingTags} tags adicionales: ${juego.tags.slice(3).join(', ')}`}
          >
            +{remainingTags}
          </span>
        )}
        
        {/* Botón para agregar más tags */}
        <button 
          className="game-tag add-tag-btn"
          onClick={(e) => {
            e.stopPropagation();
            addNewTag(juego.id);
          }}
          title="Agregar nuevo tag"
        >
          <span className="tag-icon">➕</span>
          <span className="tag-text">Agregar</span>
        </button>
      </div>
    );
  }, [juego.tags, juego.id, getTagType, getTagIcon, filterByTag, removeTag, addNewTag]);

  // Renderizado de partículas optimizado
  const renderParticles = useMemo(() => (
    <div className="particulas-juego">
      {[1, 2, 3].map((index) => (
        <div 
          key={index}
          className="particula"
          style={{
            '--delay': `${index * 0.5}s`,
            '--duration': `${3 + index * 0.5}s`,
            '--startX': `${20 + index * 15}%`,
            '--startY': `${20 + index * 10}%`
          }}
        ></div>
      ))}
    </div>
  ), []);

  return (
    <div 
      className={`tarjeta-juego ${godData.class} ${isHovered ? 'hovered' : ''} ${juego.completado ? 'completado' : 'en-progreso'} ${calculateProgress.level}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Tarjeta del juego ${juego.titulo}. ${juego.completado ? 'Completado' : 'En progreso'}. ${juego.rating} estrellas. Click para ver acciones.`}
      onKeyDown={handleKeyPress}
    >
      {/* Efecto de brillo divino con gradiente dinámico */}
      <div 
        className="divine-glow"
        style={{ background: godData.gradient }}
      ></div>
      
      {/* Portada épica con estados de carga */}
      <div className="portada-container">
        <div className="portada-overlay"></div>
        
        {/* Imagen con loading state */}
        <div className={`image-container ${imageLoaded ? 'loaded' : 'loading'} ${imageError ? 'error' : ''}`}>
          <img 
            src={imageError ? getPlaceholderImage : juego.portada}
            alt={`Portada de ${juego.titulo}`}
            className="portada-imagen"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="image-skeleton">
              <div className="skeleton-loader"></div>
              <span className="skeleton-text">Cargando leyenda...</span>
            </div>
          )}
          {imageError && (
            <div className="image-error-overlay">
              <span className="error-icon">🖼️</span>
              <span className="error-text">Imagen no disponible</span>
            </div>
          )}
        </div>
        
        {/* Badges divinos con información contextual */}
        <div className="badges-container">
          <div 
            className={`badge god-badge ${godData.class}`}
            title={`Bendecido por ${juego.dios} - ${godData.blessings.join(', ')}`}
          >
            <span className="badge-icon">{godData.icon}</span>
            <span className="badge-text">{juego.dios}</span>
          </div>
          
          <div 
            className={`badge status-badge ${getStatusData.class}`}
            title={juego.completado ? 'Leyenda completada' : 'Leyenda en progreso'}
          >
            <span className="badge-icon">{getStatusData.icon}</span>
            <span className="badge-text">{getStatusData.text}</span>
          </div>
        </div>

        {/* Efecto de brillo al hover */}
        <div className="hover-glow"></div>

        {/* Overlay de acciones rápidas en hover */}
        {isHovered && (
          <div className="quick-actions-overlay">
            <button 
              className="quick-action-btn view-btn"
              onClick={handleViewDetails}
              title="Ver detalles completos"
              aria-label="Ver detalles del juego"
            >
              👁️
            </button>
            <button 
              className="quick-action-btn edit-btn"
              onClick={handleEdit}
              title="Editar juego"
              aria-label="Editar juego"
            >
              ✏️
            </button>
            <button 
              className="quick-action-btn platform-btn"
              title={`Plataforma: ${platformData.name} - ${platformData.specs.join(', ')}`}
              aria-label={`Plataforma: ${platformData.name}`}
            >
              {platformData.icon}
            </button>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="tarjeta-contenido">
        {/* Header con título y plataforma */}
        <div className="tarjeta-header">
          <h3 className="juego-titulo epic-text" title={juego.titulo}>
            {juego.titulo}
          </h3>
          <div 
            className={`plataforma-icon ${platformData.class}`}
            title={`Jugado en ${platformData.name} - ${platformData.specs.join(', ')}`}
            aria-label={`Plataforma: ${platformData.name}`}
          >
            {platformData.icon}
          </div>
        </div>

        {/* Género y información adicional */}
        <div className="juego-meta">
          <span className="genero-text" title={`Género: ${juego.genero}`}>
            {juego.genero}
          </span>
          <span className="horas-totales" title={`${juego.horas} horas jugadas`}>
            ⏱️ {juego.horas}h
          </span>
        </div>

        {/* Tags del juego */}
        {renderTags}

        {/* Rating estelar interactivo */}
        <div className="rating-container">
          <div 
            className="estrellas"
            title={`Calificación: ${juego.rating} de 5 estrellas`}
            aria-label={`Calificación: ${juego.rating} de 5 estrellas`}
          >
            {getRatingStars}
          </div>
          <span className="rating-text">{juego.rating}/5</span>
        </div>

        {/* Barra de progreso épica corregida */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-percentage">{Math.round(calculateProgress.percentage)}%</span>
            <span className="progress-label">Progreso de Maestría</span>
          </div>
          <div 
            className="progress-container"
            title={`Nivel ${calculateProgress.level} - ${calculateProgress.text}`}
            aria-label={`Nivel de maestría: ${calculateProgress.level}, ${calculateProgress.text}`}
          >
            <div className="progress-bar">
              <div 
                className={`progress-fill ${calculateProgress.level}`}
                style={{ width: `${calculateProgress.percentage}%` }}
                data-level={calculateProgress.level}
              >
                <div className="progress-shine"></div>
              </div>
            </div>
          </div>
          <div className="progress-text">{calculateProgress.text}</div>
        </div>

        {/* Fechas sagradas con iconos */}
        <div className="fechas-sagradas">
          <div className="fecha-item">
            <span className="fecha-icon">📅</span>
            <div className="fecha-info">
              <span className="fecha-label">Adquirido</span>
              <span className="fecha-valor">{formatDate(juego.fechaAdquisicion)}</span>
            </div>
          </div>
          <div className="fecha-item">
            <span className="fecha-icon">🕒</span>
            <div className="fecha-info">
              <span className="fecha-label">Última Sesión</span>
              <span className="fecha-valor">{formatDate(juego.ultimaSesion)}</span>
            </div>
          </div>
        </div>

        {/* Acciones divinas con animaciones */}
        <div className={`acciones-divinas ${showActions ? 'show' : ''}`}>
          <button 
            className="btn-accion btn-detalles glow-on-hover"
            onClick={handleViewDetails}
            title="Explorar detalles completos de esta leyenda"
            aria-label="Ver detalles del juego"
          >
            <span className="accion-icon">🔍</span>
            <span className="accion-text">Detalles</span>
          </button>
          
          <button 
            className="btn-accion btn-editar glow-on-hover"
            onClick={handleEdit}
            title="Modificar las crónicas de este juego"
            aria-label="Editar juego completo"
          >
            <span className="accion-icon">📝</span>
            <span className="accion-text">Editar</span>
          </button>
          
          <button 
            className="btn-accion btn-eliminar glow-on-hover"
            onClick={handleDelete}
            title="Desterrar esta leyenda de tu biblioteca"
            aria-label="Eliminar juego"
          >
            <span className="accion-icon">🗑️</span>
            <span className="accion-text">Desterrar</span>
          </button>

          <button 
            className="btn-accion btn-compartir glow-on-hover"
            onClick={(e) => {
              e.stopPropagation();
              handleShareGame(juego);
            }}
            title="Compartir esta leyenda con otros héroes"
            aria-label="Compartir juego"
          >
            <span className="accion-icon">📤</span>
            <span className="accion-text">Compartir</span>
          </button>
        </div>

        {/* Sello divino con animación */}
        <div className="sello-divino">
          <div className="sello-icon">{godData.icon}</div>
          <div className="sello-content">
            <div className="sello-text">
              {juego.completado ? 'Leyenda Consumada' : 'Leyenda en Marcha'}
            </div>
            <div className="sello-subtext">
              {juego.completado ? '¡Victoria! 🏆' : '¡La aventura continúa! ⚔️'}
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de partículas dinámicas */}
      {renderParticles}

      {/* Indicador de estado */}
      <div 
        className={`estado-indicador ${juego.completado ? 'completado' : 'progreso'}`}
        aria-label={juego.completado ? 'Juego completado' : 'Juego en progreso'}
      >
        {juego.completado ? '★' : '☆'}
      </div>

      {/* Efecto de borde dinámico */}
      <div className="dynamic-border"></div>
    </div>
  );
};

// Optimizar con React.memo para evitar re-renders innecesarios
export default React.memo(TarjetaJuego);