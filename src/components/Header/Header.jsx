import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import './Header.css'

const Header = () => {
  const { currentTheme, toggleTheme, isApollo } = useTheme()

  const getLogo = () => {
    if (isApollo) {
      return (
        <div className="logo">
          <span>⚡</span>
          TEMPLO DE APOLO
          <span>🏛️</span>
        </div>
      )
    } else {
      return (
        <div className="logo">
          <span>🔮</span>
          SANTUARIO DE HECATE
          <span>🌙</span>
        </div>
      )
    }
  }

  return (
    <header className="header">
      <div className="bg-particles"></div>
      <div className="header-content">
        {getLogo()}
        
        <nav className="navigation">
          <button className="nav-button active">🏺 Biblioteca</button>
          <button className="nav-button">📜 Reseñas</button>
          <button className="nav-button">📊 Estadísticas</button>
        </nav>

        <div className="header-actions">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder={isApollo ? "🔍 Buscar entre los mortales..." : "🔍 Buscar en las sombras..."}
              className="search-input"
            />
          </div>
          
          <button className="theme-toggle" onClick={toggleTheme}>
            {isApollo ? '🌙' : '🌞'}
          </button>
          
          <div className="user-profile">
            <span className="username">
              {isApollo ? '👑 Semidiós' : '🧙 Iniciado'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header