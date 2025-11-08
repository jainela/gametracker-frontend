import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './EstadisticasPersonales.css';

const EstadisticasPersonales = () => {
  const { isDarkMode, themeName, playClickSound } = useTheme();
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState('todos');
  const [logroDesbloqueado, setLogroDesbloqueado] = useState(null);

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
          { 
            id: 1, 
            nombre: 'Iniciado', 
            descripcion: 'Completar tu primer juego', 
            completado: true, 
            icon: '🎮',
            fechaDesbloqueo: '2023-03-15',
            rareza: 'comun'
          },
          { 
            id: 2, 
            nombre: 'Coleccionista', 
            descripcion: 'Tener 10 juegos en tu biblioteca', 
            completado: true, 
            icon: '📚',
            fechaDesbloqueo: '2023-06-22',
            rareza: 'comun'
          },
          { 
            id: 3, 
            nombre: 'Veterano', 
            descripcion: 'Alcanzar 500 horas de juego', 
            completado: true, 
            icon: '⏱️',
            fechaDesbloqueo: '2023-09-30',
            rareza: 'raro'
          },
          { 
            id: 4, 
            nombre: 'Perfeccionista', 
            descripcion: 'Completar 15 juegos', 
            completado: true, 
            icon: '✅',
            fechaDesbloqueo: '2023-11-12',
            rareza: 'raro'
          },
          { 
            id: 5, 
            nombre: 'Crítico', 
            descripcion: 'Escribir 10 reseñas', 
            completado: false, 
            icon: '📝',
            fechaDesbloqueo: null,
            rareza: 'epico'
          },
          { 
            id: 6, 
            nombre: 'Leyenda', 
            descripcion: 'Alcanzar 1000 horas de juego', 
            completado: false, 
            icon: '🏆',
            fechaDesbloqueo: null,
            rareza: 'legendario'
          },
          { 
            id: 7, 
            nombre: 'Omnipotente', 
            descripcion: 'Juegos de Apolo y Hécate al 50%', 
            completado: false, 
            icon: '⚡',
            fechaDesbloqueo: null,
            rareza: 'mitico'
          },
          { 
            id: 8, 
            nombre: 'Inmortal', 
            descripcion: 'Completar 25 juegos', 
            completado: false, 
            icon: '👑',
            fechaDesbloqueo: null,
            rareza: 'divino'
          }
        ]
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

 // En la función simularDesbloqueoLogro, agregar:
const simularDesbloqueoLogro = (logroId) => {
  const logro = estadisticas.logros.find(l => l.id === logroId);
  if (logro && !logro.completado) {
    setLogroDesbloqueado(logro);
    playClickSound(); // ← Agregar esta línea
    
    // Simular efecto de desbloqueo
    setTimeout(() => {
      setLogroDesbloqueado(null);
    }, 4000);
  }
};

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
      {/* Notificación de logro desbloqueado */}
      {logroDesbloqueado && (
        <div className="logro-notification">
          <div className="logro-notification-content">
            <div className="logro-notification-icon">{logroDesbloqueado.icon}</div>
            <div className="logro-notification-text">
              <h3>¡Logro Desbloqueado!</h3>
              <p>{logroDesbloqueado.nombre}</p>
              <span>{logroDesbloqueado.descripcion}</span>
            </div>
            <div className="logro-notification-rareza">{logroDesbloqueado.rareza}</div>
          </div>
        </div>
      )}

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

      {/* Resto del componente permanece igual... */}
      {/* ... (código anterior) ... */}

      {/* Logros épicos mejorados */}
      <section className="logros-section">
        <h2 className="seccion-titulo">🏆 TROFEOS DEL DESTINO</h2>
        
        <div className="logros-grid">
          {estadisticas.logros.map(logro => (
            <div 
              key={logro.id} 
              className={`logro-card ${logro.completado ? 'completado' : 'pendiente'} ${logro.rareza} glow-on-hover`}
              onClick={() => !logro.completado && simularDesbloqueoLogro(logro.id)}
            >
              <div className="logro-icon">{logro.icon}</div>
              <div className="logro-content">
                <h4 className="logro-nombre">{logro.nombre}</h4>
                <p className="logro-desc">{logro.descripcion}</p>
                {logro.completado && logro.fechaDesbloqueo && (
                  <div className="logro-fecha">
                    Desbloqueado: {new Date(logro.fechaDesbloqueo).toLocaleDateString('es-ES')}
                  </div>
                )}
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
              <div className={`logro-rareza-badge ${logro.rareza}`}>
                {logro.rareza}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resto del componente... */}
    </div>
  );
};

export default EstadisticasPersonales;