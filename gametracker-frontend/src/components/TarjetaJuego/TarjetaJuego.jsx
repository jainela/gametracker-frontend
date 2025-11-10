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
      'Apolo': { icon: '☀️', color: 'gold', gradient: 'linear-gradient(135deg, var(--apolo-accent), transparent, var(--apolo-accent-hover))' },
      'Hécate': { icon: '🌙', color: 'purple', gradient: 'linear-gradient(135deg, var(--hecate-accent), transparent, var(--hecate-accent-hover))' },
      'Ambos': { icon: '⚡', color: 'both', gradient: 'linear-gradient(135deg, var(--apolo-accent), var(--hecate-accent), var(--apolo-accent-hover))' }
    };
    return data[juego.dios] || { icon: '🎮', color: 'default', gradient: 'linear-gradient(135deg, var(--accent), transparent, var(--accent-hover))' };
  }, [juego.dios]);

  const platformData = useMemo(() => {
    const platforms = {
      'PC': { icon: '💻', name: 'Computadora' },
      'PlayStation': { icon: '🎮', name: 'PlayStation' },
      'Xbox': { icon: '🎮', name: 'Xbox' },
      'Nintendo Switch': { icon: '🎮', name: 'Nintendo Switch' },
      'Multiplataforma': { icon: '🌐', name: 'Múltiples Plataformas' }
    };
    return platforms[juego.plataforma] || { icon: '🎮', name: juego.plataforma };
  }, [juego.plataforma]);

  // Handlers optimizados con useCallback
  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    onEdit?.(juego);
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

  return (
    <div 
      className={`tarjeta-juego ${godData.color} ${isHovered ? 'hovered' : ''} ${juego.completado ? 'completado' : 'en-progreso'} ${calculateProgress.level}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Tarjeta del juego ${juego.titulo}. ${juego.completado ? 'Completado' : 'En progreso'}. ${juego.rating} estrellas. Click para ver acciones.`}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
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
        <div className={`image-container ${imageLoaded ? 'loaded' : 'loading'}`}>
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
        </div>
        
        {/* Badges divinos con información contextual */}
        <div className="badges-container">
          <div 
            className={`badge god-badge ${godData.color}`}
            title={`Bendecido por ${juego.dios}`}
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

          {/* Badge de progreso dinámico */}
          <div className={`badge progress-badge ${calculateProgress.level}`}>
            <span className="badge-icon">📊</span>
            <span className="badge-text">{calculateProgress.level}</span>
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
            >
              👁️
            </button>
            <button 
              className="quick-action-btn edit-btn"
              onClick={handleEdit}
              title="Editar juego"
            >
              ✏️
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
            className="plataforma-icon" 
            title={`Jugado en ${platformData.name}`}
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

        {/* Rating estelar interactivo */}
        <div className="rating-container">
          <div 
            className="estrellas"
            title={`Calificación: ${juego.rating} de 5 estrellas`}
          >
            {getRatingStars}
          </div>
          <span className="rating-text">{juego.rating}/5</span>
        </div>

        {/* Barra de progreso épica con tooltip */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-label">Progreso de Maestría</span>
            <span className="progress-percentage">{Math.round(calculateProgress.percentage)}%</span>
          </div>
          <div 
            className="progress-container"
            title={`Nivel ${calculateProgress.level} - ${calculateProgress.text}`}
          >
            <div className="progress-bar">
              <div 
                className="progress-fill"
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
          >
            <span className="accion-icon">🔍</span>
            <span className="accion-text">Detalles</span>
          </button>
          
          <button 
            className="btn-accion btn-editar glow-on-hover"
            onClick={handleEdit}
            title="Modificar las crónicas de este juego"
          >
            <span className="accion-icon">📝</span>
            <span className="accion-text">Editar</span>
          </button>
          
          <button 
            className="btn-accion btn-eliminar glow-on-hover"
            onClick={handleDelete}
            title="Desterrar esta leyenda de tu biblioteca"
          >
            <span className="accion-icon">🗑️</span>
            <span className="accion-text">Desterrar</span>
          </button>

          {/* Acciones adicionales */}
          <button 
            className="btn-accion btn-compartir glow-on-hover"
            title="Compartir esta leyenda con otros héroes"
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
              {juego.completado ? '¡Victoria!' : '¡La aventura continúa!'}
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de partículas dinámicas */}
      <div className="particulas-juego">
        {[1, 2, 3, 4, 5].map((index) => (
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

      {/* Indicador de estado */}
      <div className={`estado-indicador ${juego.completado ? 'completado' : 'progreso'}`}>
        {juego.completado ? '★' : '☆'}
      </div>
    </div>
  );
};

// Optimizar con React.memo para evitar re-renders innecesarios
export default React.memo(TarjetaJuego);