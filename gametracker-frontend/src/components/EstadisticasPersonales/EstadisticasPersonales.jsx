import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './EstadisticasPersonales.css';

const EstadisticasPersonales = () => {
  const { isDarkMode, themeName } = useTheme();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState('todos');
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);

  // Cargar datos reales de la API
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        const [juegosRes, reseñasRes] = await Promise.all([
          fetch('https://gametracker-backend-1-7tfx.onrender.com/api/juegos'),
          fetch('https://gametracker-backend-1-7tfx.onrender.com/api/resenas')
        ]);

        const juegosData = juegosRes.ok ? await juegosRes.json() : [];
        const reseñasData = reseñasRes.ok ? await reseñasRes.json() : [];

        setJuegos(juegosData);
        setReseñas(reseñasData);

        // Calcular estadísticas en tiempo real
        const statsCalculadas = calcularEstadisticasReales(juegosData, reseñasData);
        setEstadisticas(statsCalculadas);

      } catch (error) {
        console.error('Error cargando estadísticas:', error);
        // En caso de error, usar datos de ejemplo
        setEstadisticas(datosEstadisticasEjemplo);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Función para calcular estadísticas reales
  const calcularEstadisticasReales = (juegosData, reseñasData) => {
    // Estadísticas generales
    const totalJuegos = juegosData.length;
    const totalHoras = juegosData.reduce((sum, juego) => sum + (juego.horasJugadas || 0), 0);
    const juegosCompletados = juegosData.filter(juego => juego.estado === 'Completado').length;
    const juegosEnProgreso = juegosData.filter(juego => juego.estado === 'Jugando').length;
    
    // Calcular rating promedio
    const ratingsJuegos = juegosData.map(j => j.rating || 0).filter(r => r > 0);
    const promedioRating = ratingsJuegos.length > 0 
      ? (ratingsJuegos.reduce((a, b) => a + b, 0) / ratingsJuegos.length).toFixed(1)
      : 0;

    // Estadísticas por género
    const generosMap = {};
    juegosData.forEach(juego => {
      const genero = juego.genero || 'Sin género';
      if (!generosMap[genero]) {
        generosMap[genero] = { cantidad: 0, horas: 0 };
      }
      generosMap[genero].cantidad++;
      generosMap[genero].horas += juego.horasJugadas || 0;
    });

    const porGenero = Object.entries(generosMap).map(([genero, data]) => ({
      genero,
      cantidad: data.cantidad,
      horas: data.horas,
      porcentaje: Math.round((data.cantidad / totalJuegos) * 100)
    })).sort((a, b) => b.cantidad - a.cantidad);

    // Estadísticas por plataforma
    const plataformasMap = {};
    juegosData.forEach(juego => {
      const plataforma = juego.plataforma || 'Sin plataforma';
      plataformasMap[plataforma] = (plataformasMap[plataforma] || 0) + 1;
    });

    const porPlataforma = Object.entries(plataformasMap).map(([plataforma, cantidad]) => ({
      plataforma,
      cantidad,
      porcentaje: Math.round((cantidad / totalJuegos) * 100)
    })).sort((a, b) => b.cantidad - a.cantidad);

    // Estadísticas por dios
    const diosesMap = {};
    juegosData.forEach(juego => {
      const dios = juego.dios || 'Apolo';
      diosesMap[dios] = (diosesMap[dios] || 0) + 1;
    });

    const porDios = Object.entries(diosesMap).map(([dios, cantidad]) => ({
      dios,
      cantidad,
      porcentaje: Math.round((cantidad / totalJuegos) * 100),
      icon: dios === 'Apolo' ? '☀️' : dios === 'Hécate' ? '🌙' : '⚡'
    })).sort((a, b) => b.cantidad - a.cantidad);

    // Logros calculados
    const logros = calcularLogros(juegosData, reseñasData, totalHoras);

    return {
      general: {
        totalJuegos,
        totalHoras,
        juegosCompletados,
        promedioRating: parseFloat(promedioRating),
        juegosEnProgreso,
        totalReseñas: reseñasData.length
      },
      porGenero,
      porPlataforma,
      porDios,
      logros
    };
  };

  // Calcular logros basados en datos reales
  const calcularLogros = (juegosData, reseñasData, totalHoras) => {
    const totalJuegos = juegosData.length;
    const juegosCompletados = juegosData.filter(j => j.estado === 'Completado').length;
    const totalReseñas = reseñasData.length;

    return [
      { 
        id: 1, 
        nombre: 'Iniciado', 
        descripcion: 'Completar tu primer juego', 
        completado: juegosCompletados >= 1, 
        icon: '🎮' 
      },
      { 
        id: 2, 
        nombre: 'Coleccionista', 
        descripcion: 'Tener 10 juegos en tu biblioteca', 
        completado: totalJuegos >= 10, 
        icon: '📚' 
      },
      { 
        id: 3, 
        nombre: 'Veterano', 
        descripcion: 'Alcanzar 100 horas de juego', 
        completado: totalHoras >= 100, 
        icon: '⏱️' 
      },
      { 
        id: 4, 
        nombre: 'Perfeccionista', 
        descripcion: 'Completar 5 juegos', 
        completado: juegosCompletados >= 5, 
        icon: '✅' 
      },
      { 
        id: 5, 
        nombre: 'Crítico', 
        descripcion: 'Escribir 5 reseñas', 
        completado: totalReseñas >= 5, 
        icon: '📝' 
      },
      { 
        id: 6, 
        nombre: 'Leyenda', 
        descripcion: 'Alcanzar 500 horas de juego', 
        completado: totalHoras >= 500, 
        icon: '🏆' 
      },
      { 
        id: 7, 
        nombre: 'Omnipotente', 
        descripcion: 'Tener juegos de ambos dioses', 
        completado: juegosData.some(j => j.dios === 'Apolo') && juegosData.some(j => j.dios === 'Hécate'), 
        icon: '⚡' 
      },
      { 
        id: 8, 
        nombre: 'Inmortal', 
        descripcion: 'Completar 10 juegos', 
        completado: juegosCompletados >= 10, 
        icon: '👑' 
      }
    ];
  };

  // Datos de ejemplo como fallback
  const datosEstadisticasEjemplo = useMemo(() => ({
    general: {
      totalJuegos: 0,
      totalHoras: 0,
      juegosCompletados: 0,
      promedioRating: 0,
      juegosEnProgreso: 0,
      totalReseñas: 0
    },
    porGenero: [],
    porPlataforma: [],
    porDios: [],
    logros: []
  }), []);

  const getTempleQuote = useCallback(() => {
    const quotes = {
      apolo: "Las estadísticas son el eco de tu gloria gaming",
      hecate: "Los números revelan patrones, los patrones revelan destinos"
    };
    return isDarkMode ? quotes.hecate : quotes.apolo;
  }, [isDarkMode]);

  const getNivelHeroico = useCallback(() => {
    const horas = estadisticas?.general.totalHoras || 0;
    if (horas >= 1000) return { nivel: 'Dios del Olimpo', icon: '👑', color: 'gold' };
    if (horas >= 500) return { nivel: 'Héroe Legendario', icon: '⚡', color: 'purple' };
    if (horas >= 250) return { nivel: 'Guerrero Experimentado', icon: '🛡️', color: 'blue' };
    if (horas >= 100) return { nivel: 'Aventurero Valiente', icon: '⚔️', color: 'green' };
    if (horas >= 50) return { nivel: 'Iniciado Prometedor', icon: '🎯', color: 'orange' };
    return { nivel: 'Novato', icon: '🎮', color: 'gray' };
  }, [estadisticas]);

  const calcularEficiencia = useCallback(() => {
    if (!estadisticas) return 0;
    const completados = estadisticas.general.juegosCompletados;
    const total = estadisticas.general.totalJuegos;
    return total > 0 ? Math.round((completados / total) * 100) : 0;
  }, [estadisticas]);

  const getRecomendacionDivina = useCallback(() => {
    const eficiencia = calcularEficiencia();
    
    if (eficiencia >= 80) {
      return "¡Eres un modelo de dedicación! Los dioses están impresionados.";
    } else if (eficiencia >= 60) {
      return "Buen equilibrio entre exploración y culminación. Sigue así.";
    } else if (eficiencia >= 40) {
      return "Te enfocas en explorar muchos mundos. Considera completar algunas aventuras.";
    } else if (eficiencia >= 20) {
      return "Eres un explorador nato. Quizás sea momento de terminar algunas historias.";
    } else {
      return "Tu viaje acaba de comenzar. Cada gran héroe empieza con un solo paso.";
    }
  }, [calcularEficiencia]);

  const periodoOpciones = useMemo(() => [
    { value: 'semana', label: '📅 Esta Semana' },
    { value: 'mes', label: '🌙 Este Mes' },
    { value: 'año', label: '☀️ Este Año' },
    { value: 'todos', label: '🌟 Todos los Tiempos' }
  ], []);

  if (loading) {
    return (
      <div className="santuario-cargando">
        <div className="oraculo-cargando">
          <div className="esfera-carga"></div>
          <h2>Consultando el Oráculo...</h2>
          <p>Analizando tus hazañas épicas</p>
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
          <h1>🔮 ORÁCULO DEL PROGRESO</h1>
          <div className="oracle-icon">📊</div>
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
            {periodoOpciones.map(option => (
              <button
                key={option.value}
                className={`periodo-btn ${periodo === option.value ? 'activo' : ''}`}
                onClick={() => setPeriodo(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas generales épicas */}
      <section className="estadisticas-generales">
        <h2 className="seccion-titulo">⭐ PANORAMA DIVINO</h2>
        
        <div className="stats-grid">
          <div className="stat-card grande">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.totalJuegos}</div>
              <div className="stat-label">Leyendas en Tu Panteón</div>
            </div>
            <div className="stat-badge">Total</div>
          </div>

          <div className="stat-card grande">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.totalHoras}h</div>
              <div className="stat-label">Horas de Gloria</div>
            </div>
            <div className="stat-badge">Acumulado</div>
          </div>

          <div className="stat-card grande">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.juegosCompletados}</div>
              <div className="stat-label">Hazañas Consumadas</div>
            </div>
            <div className="stat-badge">{eficiencia}% eficiencia</div>
          </div>

          <div className="stat-card grande">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-valor">{estadisticas.general.promedioRating}/5</div>
              <div className="stat-label">Gloria Promedio</div>
            </div>
            <div className="stat-badge">
              {estadisticas.general.promedioRating > 0 ? 'Calificado' : 'Sin calificar'}
            </div>
          </div>
        </div>

        {/* Eficiencia */}
        <div className="eficiencia-container">
          <div className="eficiencia-card">
            <h3 className="eficiencia-titulo">🎯 EFICIENCIA DEL HÉROE</h3>
            <div className="eficiencia-stats">
              <div className="eficiencia-circular">
                <div className="circular-progress">
                  <svg width="100%" height="100%" viewBox="0 0 120 120">
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
                    <span className="detalle-label">En Progreso:</span>
                    <span className="detalle-valor">{estadisticas.general.juegosEnProgreso}</span>
                  </div>
                  <div className="detalle-item">
                    <span className="detalle-label">Reseñas Escritas:</span>
                    <span className="detalle-valor">{estadisticas.general.totalReseñas}</span>
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
          <div className="distribucion-card">
            <h3 className="distribucion-titulo">🎭 POR GÉNERO ÉPICO</h3>
            <div className="distribucion-content">
              {estadisticas.porGenero.length > 0 ? (
                estadisticas.porGenero.map((item, index) => (
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
                ))
              ) : (
                <div className="sin-datos">
                  <div className="sin-datos-icon">🎮</div>
                  <p>No hay juegos registrados aún</p>
                </div>
              )}
            </div>
          </div>

          {/* Por Plataforma */}
          <div className="distribucion-card">
            <h3 className="distribucion-titulo">🎮 POR PLATAFORMA DIVINA</h3>
            <div className="plataformas-grid">
              {estadisticas.porPlataforma.length > 0 ? (
                estadisticas.porPlataforma.map(item => (
                  <div key={item.plataforma} className="plataforma-item">
                    <div className="plataforma-icon">
                      {item.plataforma === 'PlayStation' && '🎮'}
                      {item.plataforma === 'PC' && '💻'}
                      {item.plataforma === 'Nintendo Switch' && '🎮'}
                      {item.plataforma === 'Xbox' && '🎮'}
                      {item.plataforma === 'Sin plataforma' && '❓'}
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
                ))
              ) : (
                <div className="sin-datos">
                  <div className="sin-datos-icon">💻</div>
                  <p>No hay plataformas registradas</p>
                </div>
              )}
            </div>
          </div>

          {/* Por Dios */}
          <div className="distribucion-card">
            <h3 className="distribucion-titulo">🙏 BENDICIÓN DIVINA</h3>
            <div className="dioses-stats">
              {estadisticas.porDios.length > 0 ? (
                estadisticas.porDios.map(item => (
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
                ))
              ) : (
                <div className="sin-datos">
                  <div className="sin-datos-icon">🙏</div>
                  <p>No hay bendiciones divinas registradas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Logros épicos */}
      <section className="logros-section">
        <h2 className="seccion-titulo">🏆 TROFEOS DEL DESTINO</h2>
        
        <div className="logros-grid">
          {estadisticas.logros.map(logro => (
            <div key={logro.id} className={`logro-card ${logro.completado ? 'completado' : 'pendiente'}`}>
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
                  {estadisticas.porDios[0]?.icon || '🙏'} {estadisticas.porDios[0]?.dios || 'Sin datos'}
                </span>
              </div>
              <div className="oraculo-stat">
                <span className="stat-nombre">Género Favorito:</span>
                <span className="stat-valor">{estadisticas.porGenero[0]?.genero || 'Sin datos'}</span>
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