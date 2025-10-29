import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import '../styles/BibliotecaJuegos.css'

const BibliotecaJuegos = () => {
  const { isApollo } = useTheme()

  const mockGames = [
    {
      id: 1,
      title: 'God of War',
      platform: 'PS5',
      progress: 100,
      rating: 5,
      hours: 72,
      completed: true
    },
    {
      id: 2,
      title: 'Hades',
      platform: 'PC',
      progress: 85,
      rating: 4,
      hours: 45,
      completed: false
    }
  ]

  return (
    <div className="biblioteca">
      <div className="biblioteca-header">
        <h1 className="biblioteca-title">
          {isApollo ? '🏛️ PANTEÓN DE JUEGOS' : '🗝️ SANTUARIO DE JUEGOS'}
        </h1>
        <button className="add-game-button">
          {isApollo ? '⚡ Consagrar' : '✨ Conjurar'}
        </button>
      </div>

      <div className="games-grid">
        {mockGames.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-cover">
              <div className="cover-placeholder">
                {game.title.charAt(0)}
              </div>
            </div>
            
            <div className="game-info">
              <h3 className="game-title">{game.title}</h3>
              <p className="game-platform">{game.platform}</p>
              
              <div className="game-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${game.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {isApollo ? 'Consagrado' : 'Hechizado'}: {game.progress}%
                </span>
              </div>
              
              <div className="game-rating">
                {'☀️'.repeat(game.rating)}{'☆'.repeat(5 - game.rating)}
              </div>
              
              <div className="game-hours">
                {game.hours}h {isApollo ? 'de gloria' : 'en la noche'}
              </div>
              
              {game.completed && (
                <div className="game-completed">
                  {isApollo ? '🏆 Completado' : '💀 Completado'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="filters-section">
        <button className="filter-button">Filtrar por</button>
        <button className="filter-button">Plataforma</button>
        <button className="filter-button">Género</button>
        <button className="filter-button">Estado</button>
      </div>
    </div>
  )
}

export default BibliotecaJuegos