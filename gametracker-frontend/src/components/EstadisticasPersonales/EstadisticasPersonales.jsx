import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './EstadisticasPersonales.css';

const EstadisticasPersonales = () => {
  const { isDarkMode, themeName } = useTheme();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState('todos');

  useEffect(() => {
    // Simular carga de estadísticas épicas
    const timer = setTimeout(() => {
      setEstadisticas({
        general: {
          totalJuegos: 24,
          totalHoras: 856,
          juegosCompletados: 18,
          promedioRating: 4.3,
          juegosEnProgreso: 6,
          dineroInvertido: 420
        },
        porGenero: [
          { genero: 'Aventura Épica', cantidad: 8, horas: 320, porcentaje: 33 },
          { genero: 'RPG Legendario', cantidad: 6, horas: 285, porcentaje: 25 },
          { genero: 'Acción Heroica', cantidad: 4, horas: 156, porcentaje: 17 },
          { genero: 'Estrategia Divina', cantidad: 3, horas: 95, porcentaje: 12 },
          { genero: 'Otros', cantidad: 3, horas: 0, porcentaje: 13 }
        ],
        porPlataforma: [
          { plataforma: 'PlayStation', cantidad: 10, porcentaje: 42 },
          { plataforma: 'PC', cantidad: 8, porcentaje: 33 },
          { plataforma: 'Nintendo Switch', cantidad: 4, porcentaje: 17 },
          { plataforma: 'Xbox', cantidad: 2, porcentaje: 8 }
        ],
        porDios: [
          { dios: 'Apolo', cantidad: 14, porcentaje: 58, icon: '☀️' },
          { dios: 'Hécate', cantidad: 8, porcentaje: 33, icon: '🌙' },
          { dios: 'Ambos', cantidad: 2, porcentaje: 9, icon: '⚡' }
        ],
        progresionMensual: [
          { mes: 'Ene', juegos: 2, horas: 45, completados: 1 },
          { mes: 'Feb', juegos: 3, horas: 68, completados: 2 },
          { mes: 'Mar', juegos: 1, horas: 32, completados: 1 },
          { mes: 'Abr', juegos: 4, horas: 89, completados: 3 },
          { mes: 'May', juegos: 2, horas: 56, completados: 1 },
          { mes: 'Jun', juegos: 3, horas: 72, completados: 2 },
          { mes: 'Jul', juegos: 5, horas: 124, completados: 4 },
          { mes: 'Ago', juegos: 2, horas: 48, completados: 1 },
          { mes: 'Sep', juegos: 3, horas: 67, completados: 2 },
          { mes: 'Oct', juegos: 4, horas: 95, completados: 3 },
          { mes: 'Nov', juegos: 2, horas: 52, completados: 1 },
          { mes: 'Dic', juegos: 3, horas: 78, completados: 2 }
        ],
        logros: [
          { id: 1, nombre: 'Iniciado', descripcion: 'Completar tu primer juego', completado: true, icon: '🎮' },
          { id: 2, nombre: 'Coleccionista', descripcion: 'Tener 10 juegos en tu biblioteca', completado: true, icon: '📚' },
          { id: 3, nombre: 'Veterano', descripcion: 'Alcanzar 500 horas de juego', completado: true, icon: '⏱️' },
          { id: 4, nombre: 'Perfeccionista', descripcion: 'Completar 15 juegos', completado: true, icon: '✅' },
          { id: 5, nombre: 'Crítico', descripcion: 'Escribir 10 reseñas', completado: false, icon: '📝' },
          { id: 6, nombre: 'Leyenda', descripcion: 'Alcanzar 1000 horas de juego', completado: false, icon: '🏆' },
          { id: 7, nombre: 'Omnipotente', descripcion: 'Juegos de Apolo y Hécate al 50%', completado: false, icon: '⚡' },
          { id: 8, nombre: 'Inmortal', descripcion: 'Completar 25 juegos', completado: false, icon: '👑' }
        ]
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getTempleQuote = () => {
    return isDarkMode 
      ? "Los números revelan patrones, los patrones revelan destinos"
      : "Las estadísticas son el eco de tu gloria gaming";
  };

  const getNivelHeroico = () => {
    const horas = estadisticas?.general.totalHoras || 0;
    if (horas >= 1000) return { nivel: 'Dios del Olimpo', icon: '👑', color: 'gold' };
    if (horas >= 500) return { nivel: 'Héroe Legendario', icon: '⚡', color: 'purple' };
    if (horas >= 250) return { nivel: 'Guerrero Experimentado', icon: '🛡️', color: 'blue' };
    if (horas >= 100) return { nivel: 'Aventurero Valiente', icon: '⚔️', color: 'green' };
    return { nivel: 'Iniciado', icon: '🎮', color: 'gray' };
  };

  const calcularEficiencia = () => {
    if (!estadisticas) return 0;
    const completados = estadisticas.general.juegosCompletados;
    const total = estadisticas.general.totalJuegos;
    return total > 0 ? Math.round((completados / total) * 100) : 0;
  };

  const getRecomendacionDivina = () => {
    const nivel = getNivelHeroico();
    const eficiencia = calcularEficiencia();
    
    if (eficiencia >= 80) {
      return "¡Eres un modelo de dedicación! Los dioses están impresionados.";
    } else if (eficiencia >= 60) {
      return "Buen equilibrio entre exploración y culminación. Sigue así.";
    } else if (eficiencia >= 40) {
      return "Te enfocas en explorar muchos mundos. Considera completar algunas aventuras.";
    } else {
      return "Eres un explorador nato. Quizás sea momento de terminar algunas historias.";
    }
  };

  if (loading) {
    return (
      <div className="santuario-cargando">
        <div className="oraculo-cargando">
          <div className="esfera-carga glow-orb"></div>
          <h2 className="epic-text gold-text">Consultando el Oráculo...</h2>
          <p>El destino de tus estadísticas se revela</p>
          <div className="runas-cargando">
            <span className="runa">📊</span>
            <span className="runa">🔮</span>
            <span className="runa">✨</span>
          </div>
        </div>
      </div>
    );
  }

  const nivelHeroico = getNivelHeroico();
  const eficiencia = calcularEficiencia();

  return (
    <div className="estadisticas-container">
      {/* Header épico del oráculo */}
      <header className="estadisticas-header">
        <div className="oracle-banner">
          <h1 className="epic-text gold-text text-glow">🔮 ORÁCULO DEL PROGRESO</h1>
          <div className="oracle-icon float-effect">📊</div>
        </div>
        <p className="temple-greeting">{getTempleQuote()}</p>
        
        {/* Nivel heroico */}
        <div className={`nivel-heroico ${nivelHeroico.color}`}>
          <div className="nivel-icon">{nivelHeroico.icon}</div>
          <div className="nivel-info">
            <div className="nivel-titulo">Tu Rango Épico</div>
            <div className="nivel-nombre">{nivelHeroico.nivel}</div>
          </div>
          <div className="nivel-horas">{estadisticas.general.totalHoras} Horas de Gloria</div>
        </div>
      </header>

      {/* Filtros de período */}
      <div className="periodo-filtros">
        <div className="filtros-container">
          <h3 className="filtros-titulo">⏳ Período del Destino</h3>
          <div className="periodo-opciones">
            {['semana', 'mes', 'año', 'todos'].map(option => (
              <button
                key={option}
                className={`periodo-btn ${periodo === option ? 'activo' : ''}`}
                onClick={() => setPeriodo(option)}
              >
                {option === 'semana' && '📅 Esta Semana'}
                {option === 'mes' && '🌙 Este Mes'}
                {option === 'año' && '☀️ Este Año'}
                {option === 'todos' && '🌟 Todos los Tiempos'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas generales épicas */}
      <section className="estadisticas-generales">
        <h2 className="seccion-titulo">⭐ PANORAMA DIVINO</h2>
        
        <div className="stats-grid">
          <div className="stat-card grande glow-on-hover">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.totalJuegos}</div>
              <div className="stat-label">Leyendas en Tu Panteón</div>
            </div>
            <div className="stat-tendencia positiva">+12%</div>
          </div>

          <div className="stat-card grande glow-on-hover">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.totalHoras}h</div>
              <div className="stat-label">Horas de Gloria</div>
            </div>
            <div className="stat-tendencia positiva">+8%</div>
          </div>

          <div className="stat-card grande glow-on-hover">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.juegosCompletados}</div>
              <div className="stat-label">Hazañas Consumadas</div>
            </div>
            <div className="stat-tendencia positiva">+15%</div>
          </div>

          <div className="stat-card grande glow-on-hover">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.promedioRating}/5</div>
              <div className="stat-label">Gloria Promedio</div>
            </div>
            <div className="stat-tendencia neutral">+0%</div>
          </div>
        </div>

        {/* Eficiencia */}
        <div className="eficiencia-container">
          <div className="eficiencia-card">
            <h3 className="eficiencia-titulo">🎯 EFICIENCIA DEL HÉROE</h3>
            <div className="eficiencia-stats">
              <div className="eficiencia-circular">
                <div className="circular-progress">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="8"/>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--accent)" strokeWidth="8" 
                            strokeLinecap="round" strokeDasharray="339.3" 
                            strokeDashoffset={339.3 * (1 - eficiencia / 100)}/>
                  </svg>
                  <div className="progress-text">{eficiencia}%</div>
                </div>
              </div>
              <div className="eficiencia-info">
                <p className="eficiencia-desc">{getRecomendacionDivina()}</p>
                <div className="eficiencia-detalles">
                  <div className="detalle-item">
                    <span className="detalle-label">Juegos Completados:</span>
                    <span className="detalle-valor">{estadisticas.general.juegosCompletados}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Total de Juegos:</span>
                    <span className="detalle-valor">{estadisticas.general.totalJuegos}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Tasa de Finalización:</span>
                    <span className="detalle-valor">{eficiencia}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distribuciones épicas */}
      <section className="distribuciones-section">
        <h2 className="seccion-titulo">📊 DISTRIBUCIÓN DEL DESTINO</h2>
        
        <div className="distribuciones-grid">
          {/* Por Género */}
          <div className="distribucion-card glow-on-hover">
            <h3 className="distribucion-titulo">🎭 POR GÉNERO ÉPICO</h3>
            <div className="distribucion-content">
              {estadisticas.porGenero.map((item, index) => (
                <div key={item.genero} className="distribucion-item">
                  <div className="distribucion-header">
                    <span className="distribucion-label">{item.genero}</span>
                    <span className="distribucion-porcentaje">{item.porcentaje}%</span>
                  </div>
                  <div className="distribucion-bar">
                    <div 
                      className="distribucion-fill"
                      style={{ 
                        width: `${item.porcentaje}%`,
                        background: `linear-gradient(90deg, var(--accent), var(--accent-hover))`
                      }}
                    ></div>
                  </div>
                  <div className="distribucion-details">
                    <span>{item.cantidad} juegos</span>
                    <span>{item.horas}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Por Plataforma */}
          <div className="distribucion-card glow-on-hover">
            <h3 className="distribucion-titulo">🎮 POR PLATAFORMA DIVINA</h3>
            <div className="plataformas-grid">
              {estadisticas.porPlataforma.map(item => (
                <div key={item.plataforma} className="plataforma-item">
                  <div className="plataforma-icon">
                    {item.plataforma === 'PlayStation' && '🎮'}
                    {item.plataforma === 'PC' && '💻'}
                    {item.plataforma === 'Nintendo Switch' && '🎮'}
                    {item.plataforma === 'Xbox' && '🎮'}
                  </div>
                  <div className="plataforma-info">
                    <div className="plataforma-nombre">{item.plataforma}</div>
                    <div className="plataforma-stats">
                      <span>{item.cantidad} juegos</span>
                      <span>{item.porcentaje}%</span>
                    </div>
                  </div>
                  <div className="plataforma-chart">
                    <div 
                      className="plataforma-bar"
                      style={{ height: `${item.porcentaje}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Por Dios */}
          <div className="distribucion-card glow-on-hover">
            <h3 className="distribucion-titulo">🙏 BENDICIÓN DIVINA</h3>
            <div className="dioses-stats">
              {estadisticas.porDios.map(item => (
                <div key={item.dios} className="dios-stat-item">
                  <div className="dios-header">
                    <div className="dios-icon">{item.icon}</div>
                    <div className="dios-info">
                      <div className="dios-nombre">{item.dios}</div>
                      <div className="dios-porcentaje">{item.porcentaje}%</div>
                    </div>
                  </div>
                  <div className="dios-progress">
                    <div 
                      className="dios-progress-fill"
                      style={{ width: `${item.porcentaje}%` }}
                    ></div>
                  </div>
                  <div className="dios-cantidad">{item.cantidad} juegos</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Progresión mensual */}
      <section className="progresion-section">
        <h2 className="seccion-titulo">📈 CRÓNICA DEL PROGRESO</h2>
        
        <div className="progresion-card glow-on-hover">
          <div className="progresion-header">
            <h3>Evolución Mensual de Tu Gloria</h3>
            <div className="progresion-leyenda">
              <div className="leyenda-item">
                <div className="leyenda-color juegos"></div>
                <span>Juegos</span>
              </div>
              <div className="leyenda-item">
                <div className="leyenda-color horas"></div>
                <span>Horas</span>
              </div>
              <div className="leyenda-item">
                <div className="leyenda-color completados"></div>
                <span>Completados</span>
              </div>
            </div>
          </div>
          
          <div className="progresion-chart">
            {estadisticas.progresionMensual.map((mes, index) => (
              <div key={mes.mes} className="mes-column">
                <div className="mes-label">{mes.mes}</div>
                <div className="mes-bars">
                  <div 
                    className="mes-bar juegos"
                    style={{ height: `${mes.juegos * 15}px` }}
                    title={`${mes.juegos} juegos`}
                  ></div>
                  <div 
                    className="mes-bar horas"
                    style={{ height: `${mes.horas * 0.5}px` }}
                    title={`${mes.horas} horas`}
                  ></div>
                  <div 
                    className="mes-bar completados"
                    style={{ height: `${mes.completados * 20}px` }}
                    title={`${mes.completados} completados`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logros épicos */}
      <section className="logros-section">
        <h2 className="seccion-titulo">🏆 TROFEOS DEL DESTINO</h2>
        
        <div className="logros-grid">
          {estadisticas.logros.map(logro => (
            <div key={logro.id} className={`logro-card ${logro.completado ? 'completado' : 'pendiente'} glow-on-hover`}>
              <div className="logro-icon">{logro.icon}</div>
              <div className="logro-content">
                <h4 className="logro-nombre">{logro.nombre}</h4>
                <p className="logro-desc">{logro.descripcion}</p>
              </div>
              <div className="logro-estado">
                {logro.completado ? (
                  <div className="estado-completado">
                    <span className="check-icon">✅</span>
                    <span className="estado-text">Obtenido</span>
                  </div>
                ) : (
                  <div className="estado-pendiente">
                    <span className="lock-icon">🔒</span>
                    <span className="estado-text">Pendiente</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resumen del oráculo */}
      <footer className="oraculo-footer">
        <div className="oraculo-resumen">
          <h3 className="oraculo-titulo">🔮 VEREDICTO DEL ORÁCULO</h3>
          <div className="oraculo-content">
            <div className="oraculo-stats">
              <div className="oraculo-stat">
                <span className="stat-nombre">Nivel Alcanzado:</span>
                <span className="stat-valor">{nivelHeroico.nivel}</span>
              </div>
              <div className="oraculo-stat">
                <span className="stat-nombre">Eficiencia:</span>
                <span className="stat-valor">{eficiencia}%</span>
              </div>
              <div className="oraculo-stat">
                <span className="stat-nombre">Dios Predilecto:</span>
                <span className="stat-valor">
                  {estadisticas.porDios[0].icon} {estadisticas.porDios[0].dios}
                </span>
              </div>
              <div className="oraculo-stat">
                <span className="stat-nombre">Género Favorito:</span>
                <span className="stat-valor">{estadisticas.porGenero[0].genero}</span>
              </div>
            </div>
            <div className="oraculo-mensaje">
              <p className="mensaje-text">
                {isDarkMode 
                  ? "Hécate observa tu progreso con interés. Tu diversidad en géneros es admirable, pero recuerda que la profundidad también tiene su magia."
                  : "Apolo celebra tu dedicación. Tu eficiencia brilla como el sol, pero no olvides explorar nuevos horizontes gaming."
                }
              </p>
              <div className="oraculo-prediccion">
                <span className="prediccion-icon">🔮</span>
                <span className="prediccion-text">
                  Próximo logro: {estadisticas.logros.find(l => !l.completado)?.nombre || '¡Todos completados!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EstadisticasPersonales;