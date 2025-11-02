import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './TarjetaJuego.css';

const TarjetaJuego = ({ juego, onEdit, onDelete }) => {
  const { isDarkMode } = useTheme();

  const handleEdit = () => {
    if (onEdit) onEdit(juego);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(juego.id);
  };

  const getGodBadge = () => {
    switch(juego.dios) {
      case 'Apolo':
        return { icon: '☀️', text: 'Bendición de Apolo', class: 'badge-apolo' };
      case 'Hécate':
        return { icon: '🌙', text: 'Protección de Hécate', class: 'badge-hecate' };
      case 'Ambos':
        return { icon: '⚡', text: 'Favor Divino', class: 'badge-divine' };
      default:
        return { icon: '🎮', text: 'Leyenda Mortal', class: 'badge-mortal' };
    }
  };

  const getAchievementLevel = () => {
    if (juego.horas >= 100) return { level: 'ÉPICO', class: 'epic-level' };
    if (juego.horas >= 50) return { level: 'HEROICO', class: 'heroic-level' };
    if (juego.horas >= 20) return { level: 'VALIENTE', class: 'valiant-level' };
    return { level: 'INICIADO', class: 'initiate-level' };
  };

  const godBadge = getGodBadge();
  const achievement = getAchievementLevel();

  return (
    <div className={`reliquia-juego ${juego.completado ? 'reliquia-completada' : ''}`}>
      {/* Marco divino */}
      <div className="reliquia-marco">
        <div className="reliquia-superior">
          <div className="dios-bendicion">
            <span className={`badge-dios ${godBadge.class}`}>
              {godBadge.icon} {godBadge.text}
            </span>
          </div>
          <div className="nivel-hazaña">
            <span className={`badge-hazaña ${achievement.class}`}>
              {achievement.level}
            </span>
          </div>
        </div>

        {/* Portada sagrada */}
        <div className="reliquia-portada">
          <img src={juego.portada} alt={juego.titulo} />
          {juego.completado && (
            <div className="sello-completado">
              <span className="sello-icono">🏆</span>
              <span className="sello-texto">HAZAÑA COMPLETADA</span>
            </div>
          )}
          <div className="velo-sagrado">
            <button className="btn-oraculo ver-profecia">
              🔮 Ver Profecía
            </button>
          </div>
        </div>
        
        {/* Contenido de la reliquia */}
        <div className="reliquia-contenido">
          <h3 className="reliquia-titulo">{juego.titulo}</h3>
          
          {/* Metadatos épicos */}
          <div className="cronicas-juego">
            <div className="cronica-gloria">
              <span className="cronica-icono">⭐</span>
              <span className="cronica-texto">
                <strong>Gloria:</strong> {juego.rating}/5
              </span>
              <div className="estrellas-divinas">
                {'✦'.repeat(juego.rating)}
                {'☆'.repeat(5 - juego.rating)}
              </div>
            </div>
            
            <div className="cronica-tiempo">
              <span className="cronica-icono">⏳</span>
              <span className="cronica-texto">
                <strong>Jornada:</strong> {juego.horas} horas
              </span>
            </div>
          </div>

          {/* Información del oráculo */}
          <div className="oraculo-info">
            <div className="profecia-genero">
              <span className="profecia-icono">🎭</span>
              <span className="profecia-texto">{juego.genero}</span>
            </div>
            <div className="profecia-plataforma">
              <span className="profecia-icono">⚔️</span>
              <span className="profecia-texto">{juego.plataforma}</span>
            </div>
          </div>

          {/* Estado de la misión */}
          <div className="estado-mision">
            <span className={`estado ${juego.completado ? 'completada' : 'en-progreso'}`}>
              {juego.completado ? (
                <>
                  <span className="estado-icono">🎯</span>
                  MISIÓN CUMPLIDA
                </>
              ) : (
                <>
                  <span className="estado-icono">🗺️</span>
                  EN BUSCA DE LA GLORIA
                </>
              )}
            </span>
          </div>

          {/* Acciones del héroe */}
          <div className="acciones-heroe">
            <button 
              className="btn-hechizo btn-editar-cronica"
              onClick={handleEdit}
            >
              <span className="btn-icono">📜</span>
              EDITAR CRÓNICA
            </button>
            <button 
              className="btn-maldicion btn-destierro"
              onClick={handleDelete}
            >
              <span className="btn-icono">⚰️</span>
              AL OLVIDO
            </button>
          </div>
        </div>

        {/* Efectos de partículas */}
        <div className="particulas-divinas"></div>
      </div>
    </div>
  );
};

export default TarjetaJuego;