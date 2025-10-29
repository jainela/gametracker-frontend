import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header/Header'
import BibliotecaJuegos from './pages/BibliotecaJuegos'
import './styles/App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BibliotecaJuegos />} />
              <Route path="/biblioteca" element={<BibliotecaJuegos />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App