import React from 'react';
import './TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEdit, onDelete }) => {
  const handleEdit = () => {
    if (onEdit) onEdit(juego);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(juego.id);
  };

  return (
    <div className="tarjeta-juego">
      <div className="tarjeta-portada">
        <img src={juego.portada} alt={juego.titulo} />
        {juego.completado && (
          <span className="completado-badge">✅ Completado</span>
        )}
        <div className="tarjeta-overlay">
          <button className="btn-overlay ver-detalles">
            👁️ Ver Detalles
          </button>
        </div>
      </div>
      
      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{juego.titulo}</h3>
        
        <div className="tarjeta-metadata">
          <div className="rating">
            <span className="estrellas">{'⭐'.repeat(juego.rating)}</span>
            <span className="rating-text">({juego.rating}/5)</span>
          </div>
          
          <div className="horas-jugadas">
            <span className="horas-icon">⏱️</span>
            <span>{juego.horas}h</span>
          </div>
        </div>

        <div className="tarjeta-estado">
          <span className={`estado ${juego.completado ? 'completado' : 'en-progreso'}`}>
            {juego.completado ? '🎯 Completado' : '🚧 En progreso'}
          </span>
        </div>

        <div className="tarjeta-acciones">
          <button 
            className="btn btn-editar"
            onClick={handleEdit}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn btn-eliminar"
            onClick={handleDelete}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaJuego;