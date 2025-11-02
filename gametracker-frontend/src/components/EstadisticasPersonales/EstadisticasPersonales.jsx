import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './EstadisticasPersonales.css';

const EstadisticasPersonales = () => {
  const { isDarkMode } = useTheme();

  const estadisticas = {
    totalJuegos: 24,
    completados: 16,
    horasTotales: 842,
    ratingPromedio: 4.3,
    juegosFavoritos: ['The Legend of Zelda: BOTW', 'Hollow Knight', 'God of War'],
    generoPreferido: 'Aventura',
    plataformaPreferida: 'PC',
    rachaActual: 15,
    logrosDesbloqueados: 42
  };

  const getProgresoDioses = () => {
    return {
      apolo: 65, // Porcentaje de juegos de luz
      hecate: 35  // Porcentaje de juegos de oscuridad
    };
  };

  const progreso = getProgresoDioses();

  return (
    <div className="oraculo-progreso">
      {/* Templo del Oráculo */}
      <header className="templo-oraculo">
        <div className="esfera-cristal">
          <h1 className="epic-text gold-text">🔮 ORÁCULO DEL PROGRESO</h1>
          <div className="humo-profetico">✨</div>
        </div>
        <p className="profecia-oraculo">
          {isDarkMode 
            ? "Hécate revela los secretos de tu camino gaming" 
            : "Apolo ilumina las glorias de tu travesía gaming"
          }
        </p>
      </header>

      {/* Espejo del Alma Gamer */}
      <div className="espejo-alma">
        <div className="reflejo-estadisticas">
          <div className="estadistica-principal">
            <div className="numero-epico">{estadisticas.totalJuegos}</div>
            <div className="label-epico">Leyendas en tu Panteón</div>
          </div>
          <div className="estadistica-principal">
            <div className="numero-epico">{estadisticas.horasTotales}h</div>
            <div className="label-epico">Tiempo en el Olimpo</div>
          </div>
          <div className="estadistica-principal">
            <div className="numero-epico">{estadisticas.ratingPromedio}/5</div>
            <div className="label-epico">Gloria Promedio</div>
          </div>
        </div>
      </div>

      {/* Tablillas de Poder */}
      <div className="tablillas-poder">
        <div className="tablilla tablilla-completados">
          <div className="tablilla-header">
            <span className="tablilla-icono">🎯</span>
            <h3>Hazañas Cumplidas</h3>
          </div>
          <div className="tablilla-contenido">
            <div className="progreso-epico">
              <div className="barra-progreso">
                <div 
                  className="progreso-completado"
                  style={{ width: `${(estadisticas.completados / estadisticas.totalJuegos) * 100}%` }}
                ></div>
              </div>
              <div className="estadistica-progreso">
                <span className="numero">{estadisticas.completados}</span>
                <span className="total">/ {estadisticas.totalJuegos}</span>
              </div>
            </div>
            <div className="sabiduria-progreso">
              {estadisticas.completados / estadisticas.totalJuegos >= 0.7 
                ? "¡Verdadero héroe del Olimpo!" 
                : "El camino a la gloria continúa..."}
            </div>
          </div>
        </div>

        <div className="tablilla tablilla-dioses">
          <div className="tablilla-header">
            <span className="tablilla-icono">⚡</span>
            <h3>Equilibrio Divino</h3>
          </div>
          <div className="tablilla-contenido">
            <div className="alineacion-dioses">
              <div className="dios-progreso dios-apolo">
                <div className="dios-info">
                  <span className="dios-icono">☀️</span>
                  <span className="dios-nombre">Apolo</span>
                </div>
                <div className="progreso-dios">
                  <div className="barra-dios">
                    <div 
                      className="progreso-dios-completado"
                      style={{ width: `${progreso.apolo}%` }}
                    ></div>
                  </div>
                  <span className="porcentaje-dios">{progreso.apolo}%</span>
                </div>
              </div>
              <div className="dios-progreso dios-hecate">
                <div className="dios-info">
                  <span className="dios-icono">🌙</span>
                  <span className="dios-nombre">Hécate</span>
                </div>
                <div className="progreso-dios">
                  <div className="barra-dios">
                    <div 
                      className="progreso-dios-completado"
                      style={{ width: `${progreso.hecate}%` }}
                    ></div>
                  </div>
                  <span className="porcentaje-dios">{progreso.hecate}%</span>
                </div>
              </div>
            </div>
            <div className="sabiduria-dioses">
              {progreso.apolo > progreso.hecate 
                ? "Tu alma busca la luz y la gloria" 
                : "Tu espíritu explora los misterios oscuros"}
            </div>
          </div>
        </div>

        <div className="tablilla tablilla-logros">
          <div className="tablilla-header">
            <span className="tablilla-icono">🏆</span>
            <h3>Trofeos del Héroe</h3>
          </div>
          <div className="tablilla-contenido">
            <div className="contador-logros">
              <div className="numero-logros">{estadisticas.logrosDesbloqueados}</div>
              <div className="label-logros">Logros Desbloqueados</div>
            </div>
            <div className="medallas-heroe">
              <div className="medalla medalla-oro">🥇</div>
              <div className="medalla medalla-plata">🥈</div>
              <div className="medalla medalla-bronce">🥉</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panteón Personal */}
      <div className="panteon-personal">
        <h2 className="titulo-panteon">🏛️ Tu Panteón Personal</h2>
        <div className="virtudes-heroe">
          <div className="virtud">
            <span className="virtud-icono">⚔️</span>
            <div className="virtud-info">
              <div className="virtud-nombre">Juego Favorito</div>
              <div className="virtud-valor">{estadisticas.juegosFavoritos[0]}</div>
            </div>
          </div>
          <div className="virtud">
            <span className="virtud-icono">🎭</span>
            <div className="virtud-info">
              <div className="virtud-nombre">Género Preferido</div>
              <div className="virtud-valor">{estadisticas.generoPreferido}</div>
            </div>
          </div>
          <div className="virtud">
            <span className="virtud-icono">🖥️</span>
            <div className="virtud-info">
              <div className="virtud-nombre">Plataforma Elegida</div>
              <div className="virtud-valor">{estadisticas.plataformaPreferida}</div>
            </div>
          </div>
          <div className="virtud">
            <span className="virtud-icono">🔥</span>
            <div className="virtud-info">
              <div className="virtud-nombre">Racha Actual</div>
              <div className="virtud-valor">{estadisticas.rachaActual} días</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profecía del Oráculo */}
      <footer className="profecia-final">
        <div className="rollo-profecia">
          <p className="texto-profecia">
            {isDarkMode 
              ? "Hécate ve: Tu camino gaming se entrelaza con la oscuridad, revelando verdades ocultas" 
              : "Apolo profetiza: Tu destreza gaming brilla como el sol, iluminando nuevas glorias"
            }
          </p>
          <div className="sello-oraculo">
            <span className="sello-texto">Sellado por el Oráculo</span>
            <span className="sello-icono">🔮</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EstadisticasPersonales;