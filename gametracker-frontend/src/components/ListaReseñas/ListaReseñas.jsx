import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './ListaReseñas.css';

const ListaReseñas = () => {
  const { isDarkMode } = useTheme();

  const reseñasEjemplo = [
    {
      id: 1,
      juego: 'The Legend of Zelda: Breath of the Wild',
      autor: 'Link el Heroico',
      rating: 5,
      comentario: 'Una epopeya que redefine la aventura. Cada montaña escalada es una ofrenda a Apolo.',
      fecha: '2024-01-15',
      dios: 'Apolo'
    },
    {
      id: 2,
      juego: 'Bloodborne',
      autor: 'Cazador de Pesadillas',
      rating: 5,
      comentario: 'Hécate susurra en cada esquina oscura. Una danza macabra con la locura.',
      fecha: '2024-01-10',
      dios: 'Hécate'
    },
    {
      id: 3,
      juego: 'Hades',
      autor: 'Zagreus',
      rating: 5,
      comentario: 'El Olimpo mismo aprueba esta obra maestra. ¡Por los dioses!',
      fecha: '2024-01-08',
      dios: 'Ambos'
    }
  ];

  const getDiosIcono = (dios) => {
    switch(dios) {
      case 'Apolo': return '☀️';
      case 'Hécate': return '🌙';
      case 'Ambos': return '⚡';
      default: return '📜';
    }
  };

  const getDiosClase = (dios) => {
    switch(dios) {
      case 'Apolo': return 'cronica-apolo';
      case 'Hécate': return 'cronica-hecate';
      case 'Ambos': return 'cronica-divina';
      default: return 'cronica-mortal';
    }
  };

  return (
    <div className="santuario-cronicas">
      {/* Header del Salón de Crónicas */}
      <header className="salon-header">
        <div className="rollos-sagrados">
          <h1 className="epic-text gold-text">📜 SALÓN DE LAS CRÓNICAS</h1>
          <div className="pluma-diosa">
            <span className="pluma-icono">✒️</span>
          </div>
        </div>
        <p className="salon-subtitulo">
          {isDarkMode 
            ? "Donde Hécate guarda los secretos de los juegos" 
            : "Donde Apolo inmortaliza las glorias gaming"
          }
        </p>
      </header>

      {/* Tablilla de Sabiduría */}
      <div className="tablilla-sabiduria">
        <div className="oraculo-escritura">
          <span className="oraculo-icono">🔮</span>
          <p>"Las mejores historias se escriben con pasión y se revisan con sabiduría"</p>
          <span className="firma-oraculo">- Oráculo de GameTracker</span>
        </div>
      </div>

      {/* Acciones del Cronista */}
      <div className="acciones-cronista">
        <button className="btn btn-epic btn-escribir">
          ✍️ Escribir Nueva Crónica
        </button>
        <button className="btn btn-magic btn-filtrar">
          🔍 Filtrar por Dios
        </button>
      </div>

      {/* Lista de Crónicas */}
      <section className="biblioteca-cronicas">
        {reseñasEjemplo.length === 0 ? (
          <div className="santuario-vacio">
            <div className="papiro-vacio">📜</div>
            <h3>El Salón de Crónicas está en Silencio</h3>
            <p>Sé el primero en escribir sobre tus hazañas gaming</p>
            <button className="btn btn-epic btn-escribir">
              ✍️ Comenzar Crónica
            </button>
          </div>
        ) : (
          <div className="columnas-cronicas">
            {reseñasEjemplo.map(reseña => (
              <div key={reseña.id} className={`cronica-papiro ${getDiosClase(reseña.dios)}`}>
                <div className="cronica-header">
                  <div className="sello-dios">
                    <span className="dios-icono">{getDiosIcono(reseña.dios)}</span>
                    <span className="dios-texto">{reseña.dios}</span>
                  </div>
                  <div className="estrellas-cronicas">
                    {'⭐'.repeat(reseña.rating)}
                  </div>
                </div>
                
                <div className="cronica-cuerpo">
                  <h3 className="cronica-titulo">{reseña.juego}</h3>
                  <div className="cronica-autor">
                    <span className="autor-icono">👤</span>
                    <span className="autor-texto">{reseña.autor}</span>
                  </div>
                  <p className="cronica-texto">"{reseña.comentario}"</p>
                </div>

                <div className="cronica-footer">
                  <div className="cronica-fecha">
                    <span className="fecha-icono">📅</span>
                    {reseña.fecha}
                  </div>
                  <div className="acciones-cronica">
                    <button className="btn-pequeno btn-editar-cronica">
                      ✏️ Editar
                    </button>
                    <button className="btn-pequeno btn-borrar-cronica">
                      🗑️ Borrar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Piedra Angular */}
      <footer className="piedra-angular">
        <div className="sabiduria-ancestral">
          <p className="sabiduria-texto">
            {isDarkMode 
              ? "Hécate sabe: Una buena reseña es un hechizo que perdura" 
              : "Apolo canta: Tus palabras dan gloria eterna a los juegos"
            }
          </p>
          <div className="estadisticas-cronicas">
            <span className="estadistica">📜 {reseñasEjemplo.length} Crónicas</span>
            <span className="estadistica">⭐ {reseñasEjemplo.reduce((acc, r) => acc + r.rating, 0) / reseñasEjemplo.length} Promedio</span>
            <span className="estadistica">👥 {new Set(reseñasEjemplo.map(r => r.autor)).size} Autores</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ListaReseñas;