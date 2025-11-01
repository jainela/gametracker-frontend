import React, { useState } from 'react';
import TarjetaJuego from '../TarjetaJuego/TarjetaJuego';
import './BibliotecaJuegos.css';

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([
    {
      id: 1,
      titulo: 'The Legend of Zelda: Breath of the Wild',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wya.jpg',
      completado: true,
      horas: 85,
      rating: 5
    },
    {
      id: 2,
      titulo: 'Hollow Knight',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7h.jpg',
      completado: false,
      horas: 42,
      rating: 4
    },
    {
      id: 3,
      titulo: 'God of War',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg',
      completado: true,
      horas: 35,
      rating: 5
    },
    {
      id: 4,
      titulo: 'Celeste',
      portada: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7e.jpg',
      completado: false,
      horas: 18,
      rating: 4
    }
  ]);

  const handleEditJuego = (juego) => {
    console.log('Editar juego:', juego);
    alert(`Editando: ${juego.titulo}`);
  };

  const handleDeleteJuego = (juegoId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este juego?')) {
      setJuegos(juegos.filter(juego => juego.id !== juegoId));
    }
  };

  const juegosCompletados = juegos.filter(juego => juego.completado).length;
  const totalHoras = juegos.reduce((total, juego) => total + juego.horas, 0);
  const ratingPromedio = (juegos.reduce((total, juego) => total + juego.rating, 0) / juegos.length).toFixed(1);

  return (
    <div className="biblioteca-container">
      <header className="biblioteca-header">
        <h1>🎮 Mi Biblioteca de Juegos</h1>
        <p>Gestiona y organiza tu colección personal de videojuegos</p>
      </header>

      <div className="biblioteca-stats">
        <div className="stat-card">
          <h3>Total Juegos</h3>
          <span className="stat-number">{juegos.length}</span>
        </div>
        <div className="stat-card">
          <h3>Completados</h3>
          <span className="stat-number">{juegosCompletados}</span>
        </div>
        <div className="stat-card">
          <h3>Horas Totales</h3>
          <span className="stat-number">{totalHoras}h</span>
        </div>
        <div className="stat-card">
          <h3>Rating Promedio</h3>
          <span className="stat-number">{ratingPromedio}/5</span>
        </div>
      </div>

      <section className="juegos-grid-section">
        <div className="section-header">
          <h2>Todos los Juegos ({juegos.length})</h2>
          <button className="btn btn-primary">
            ➕ Agregar Nuevo Juego
          </button>
        </div>

        {juegos.length === 0 ? (
          <div className="empty-state">
            <h3>🎮 Tu biblioteca está vacía</h3>
            <p>Comienza agregando tu primer juego a la colección</p>
            <button className="btn btn-primary">
              ➕ Agregar Primer Juego
            </button>
          </div>
        ) : (
          <div className="juegos-grid">
            {juegos.map(juego => (
              <TarjetaJuego 
                key={juego.id}
                juego={juego}
                onEdit={handleEditJuego}
                onDelete={handleDeleteJuego}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BibliotecaJuegos;