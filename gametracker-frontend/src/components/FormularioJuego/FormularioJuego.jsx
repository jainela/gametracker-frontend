import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './FormularioJuego.css';

const FormularioJuego = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="santuario-formulario">
      <div className="altar-creacion">
        <div className="oraculo-header">
          <h1 className="epic-text gold-text">⚔️ FORJAR NUEVA LEYENDA</h1>
          <p className="oraculo-subtitulo">
            {isDarkMode 
              ? "Hécate aguarda tu ofrenda en la oscuridad" 
              : "Apolo bendice tu nueva epopeya bajo el sol"
            }
          </p>
        </div>
        
        <div className="piedra-sagrada">
          <div className="runas-poder">
            <span className="runa">📜</span>
            <span className="runa">⚔️</span>
            <span className="runa">🛡️</span>
            <span className="runa">🎯</span>
          </div>
          
          <div className="mensaje-oraculo">
            <p>El oráculo prepara los pergaminos para tu nueva leyenda...</p>
            <div className="profecias-pendientes">
              <span className="profecia">✨ Sistema de Profecías en Desarrollo</span>
              <span className="profecia">🔮 Tablillas de Poder Próximamente</span>
              <span className="profecia">🏺 Ofrendas a los Dioses en Camino</span>
            </div>
          </div>
        </div>

        <div className="acciones-sagradas">
          <button className="btn btn-epic btn-consulta">
            🔍 Consultar el Oráculo
          </button>
          <button className="btn btn-magic btn-retorno">
            🏛️ Volver al Santuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioJuego;