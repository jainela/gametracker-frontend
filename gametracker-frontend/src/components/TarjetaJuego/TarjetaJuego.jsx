import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getGodIcon = () => {
    switch (juego.dios) {
      case 'Apolo': return '☀️';
      case 'Hécate': return '🌙';
      case 'Ambos': return '⚡';
      default: return '🎮';
    }
  };

  const getGodColor = () => {
    switch (juego.dios) {
      case 'Apolo': return 'gold';
      case 'Hécate': return 'purple';
      case 'Ambos': return 'both';
      default: return 'default';
    }
  };

  const getStatusIcon = () => {
    return juego.completado ? '✅' : '⏳';
  };

  const getPlatformIcon = () => {
    const platforms = {
      'PC': '💻',
      'PlayStation': '🎮',
      'Xbox': '🎮',
      'Nintendo Switch': '🎮',
      'Multiplataforma': '🌐'
    };
    return platforms[juego.plataforma] || '🎮';
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(juego);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(juego.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateProgress = () => {
    // Simular progreso basado en horas (para demo)
    const maxHours = 100;
    return Math.min((juego.horas / maxHours) * 100, 100);
  };

  return (
    <div 
      className={`tarjeta-juego ${getGodColor()} ${isHovered ? 'hovered' : ''} ${juego.completado ? 'completado' : 'en-progreso'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowActions(!showActions)}
    >
      {/* Efecto de brillo divino */}
      <div className="divine-glow"></div>
      
      {/* Portada épica con efectos */}
      <div className="portada-container">
        <div className="portada-overlay"></div>
        <img 
          src={juego.portada} 
          alt={juego.titulo}
          className="portada-imagen"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x400/${isDarkMode ? '1a1a2e' : 'fef9e7'}/${
              isDarkMode ? '8b5cf6' : 'd4af37'
            }?text=${encodeURIComponent(juego.titulo)}`;
          }}
        />
        
        {/* Badges divinos */}
        <div className="badges-container">
          <div className={`badge god-badge ${getGodColor()}`}>
            <span className="badge-icon">{getGodIcon()}</span>
            <span className="badge-text">{juego.dios}</span>
          </div>
          
          <div className={`badge status-badge ${juego.completado ? 'completado' : 'progreso'}`}>
            <span className="badge-icon">{getStatusIcon()}</span>
            <span className="badge-text">
              {juego.completado ? 'Completado' : 'En Progreso'}
            </span>
          </div>
        </div>

        {/* Efecto de brillo al hover */}
        <div className="hover-glow"></div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="tarjeta-contenido">
        {/* Header con título y plataforma */}
        <div className="tarjeta-header">
          <h3 className="juego-titulo epic-text">{juego.titulo}</h3>
          <div className="plataforma-icon" title={juego.plataforma}>
            {getPlatformIcon()}
          </div>
        </div>

        {/* Género */}
        <div className="juego-genero">
          <span className="genero-text">{juego.genero}</span>
        </div>

        {/* Rating estelar */}
        <div className="rating-container">
          <div className="estrellas">
            {getRatingStars(juego.rating)}
          </div>
          <span className="rating-text">{juego.rating}/5</span>
        </div>

        {/* Estadísticas del héroe */}
        <div className="estadisticas-heroe">
          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <span className="stat-value">{juego.horas}h</span>
            <span className="stat-label">de Gloria</span>
          </div>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
            <span className="progress-text">
              {Math.round(calculateProgress())}% de Maestría
            </span>
          </div>
        </div>

        {/* Fechas épicas */}
        <div className="fechas-sagradas">
          <div className="fecha-item">
            <span className="fecha-label">Adquirido:</span>
            <span className="fecha-valor">{formatDate(juego.fechaAdquisicion)}</span>
          </div>
          <div className="fecha-item">
            <span className="fecha-label">Última Sesión:</span>
            <span className="fecha-valor">{formatDate(juego.ultimaSesion)}</span>
          </div>
        </div>

        {/* Acciones divinas */}
        <div className={`acciones-divinas ${showActions ? 'show' : ''}`}>
          <button 
            className="btn-accion btn-editar glow-on-hover"
            onClick={handleEdit}
            title="Editar crónicas del juego"
          >
            <span className="accion-icon">📝</span>
            <span className="accion-text">Editar</span>
          </button>
          
          <button 
            className="btn-accion btn-eliminar glow-on-hover"
            onClick={handleDelete}
            title="Desterrar de la biblioteca"
          >
            <span className="accion-icon">🗑️</span>
            <span className="accion-text">Desterrar</span>
          </button>
          
          <button 
            className="btn-accion btn-detalles glow-on-hover"
            title="Ver detalles completos"
          >
            <span className="accion-icon">🔍</span>
            <span className="accion-text">Detalles</span>
          </button>
        </div>

        {/* Sello divino */}
        <div className="sello-divino">
          <div className="sello-icon">{getGodIcon()}</div>
          <div className="sello-text">
            {juego.completado ? 'Leyenda Consumada' : 'Leyenda en Marcha'}
          </div>
        </div>
      </div>

      {/* Efectos de partículas */}
      <div className="particulas-juego">
        <div className="particula"></div>
        <div className="particula"></div>
        <div className="particula"></div>
      </div>
    </div>
  );
};

export default TarjetaJuego;