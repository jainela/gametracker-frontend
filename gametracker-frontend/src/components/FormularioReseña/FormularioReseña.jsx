import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './FormularioReseña.css';

const FormularioReseña = () => {
  const { isDarkMode } = useTheme();
  const [diosSeleccionado, setDiosSeleccionado] = useState('');

  const juegos = [
    'The Legend of Zelda: Breath of the Wild',
    'Hollow Knight', 
    'God of War',
    'Bloodborne',
    'Hades',
    'Journey'
  ];

  return (
    <div className="templo-escritura">
      <div className="atalaya-cronista">
        <div className="rollo-principal">
          <h1 className="epic-text gold-text">✍️ TABLILLA DEL CRONISTA</h1>
          <p className="instruccion-oraculo">
            {isDarkMode 
              ? "Que Hécate inspire tus palabras en la oscuridad" 
              : "Que Apolo guíe tu pluma bajo la luz de la verdad"
            }
          </p>
        </div>

        {/* Selección Divina */}
        <div className="seleccion-divina">
          <h3 className="titulo-seccion">🏛️ Bajo el Patrocinio de:</h3>
          <div className="dioses-opciones">
            <button 
              className={`opcion-dios ${diosSeleccionado === 'Apolo' ? 'seleccionado' : ''}`}
              onClick={() => setDiosSeleccionado('Apolo')}
            >
              <span className="icono-dios">☀️</span>
              <span className="texto-dios">Apolo</span>
              <span className="descripcion-dios">Luz y Verdad</span>
            </button>
            <button 
              className={`opcion-dios ${diosSeleccionado === 'Hécate' ? 'seleccionado' : ''}`}
              onClick={() => setDiosSeleccionado('Hécate')}
            >
              <span className="icono-dios">🌙</span>
              <span className="texto-dios">Hécate</span>
              <span className="descripcion-dios">Misterio y Profundidad</span>
            </button>
            <button 
              className={`opcion-dios ${diosSeleccionado === 'Ambos' ? 'seleccionado' : ''}`}
              onClick={() => setDiosSeleccionado('Ambos')}
            >
              <span className="icono-dios">⚡</span>
              <span className="texto-dios">Ambos</span>
              <span className="descripcion-dios">Equilibrio Divino</span>
            </button>
          </div>
        </div>

        {/* Formulario de Escritura */}
        <div className="papiro-formulario">
          <div className="campo-sagrado">
            <label className="label-epico">🎮 Leyenda a Críticar</label>
            <select className="select-divino">
              <option value="">Selecciona una epopeya...</option>
              {juegos.map(juego => (
                <option key={juego} value={juego}>{juego}</option>
              ))}
            </select>
          </div>

          <div className="campo-sagrado">
            <label className="label-epico">⭐ Nivel de Gloria</label>
            <div className="estrellas-input">
              {[1, 2, 3, 4, 5].map(estrella => (
                <button key={estrella} className="btn-estrella">
                  ☆
                </button>
              ))}
            </div>
          </div>

          <div className="campo-sagrado">
            <label className="label-epico">📜 Tu Crónica Sagrada</label>
            <textarea 
              className="textarea-epico"
              placeholder="Describe tus hazañas, reflexiones y secretos descubiertos..."
              rows="6"
            ></textarea>
            <div className="contador-palabras">
              <span className="contador-texto">0 palabras escritas</span>
            </div>
          </div>

          <div className="campo-sagrado">
            <label className="label-epico">👤 Firma del Héroe</label>
            <input 
              type="text" 
              className="input-epico"
              placeholder="Tu nombre legendario..."
            />
          </div>
        </div>

        {/* Acciones Finales */}
        <div className="acciones-finales">
          <button className="btn btn-magic btn-descansar">
            🏛️ Descansar la Pluma
          </button>
          <button className="btn btn-epic btn-inmortalizar">
            💫 Inmortalizar Crónica
          </button>
        </div>

        {/* Consejo del Oráculo */}
        <div className="consejo-oraculo">
          <div className="oraculo-icono">🔮</div>
          <p className="consejo-texto">
            {diosSeleccionado 
              ? `Escribe con el corazón, ${diosSeleccionado} bendice tu honestidad`
              : "Elige un dios patrón para inspirar tu escritura"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormularioReseña;