import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import BibliotecaJuegos from './components/BibliotecaJuegos/BibliotecaJuegos';
import FormularioJuego from './components/FormularioJuego/FormularioJuego';
import ListaReseñas from './components/ListaReseñas/ListaReseñas';
import FormularioReseña from './components/FormularioReseña/FormularioReseña';
import EstadisticasPersonales from './components/EstadisticasPersonales/EstadisticasPersonales';
import './styles/themes.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<BibliotecaJuegos />} />
            <Route path="/agregar-juego" element={<FormularioJuego />} />
            <Route path="/reseñas" element={<ListaReseñas />} />
            <Route path="/agregar-reseña" element={<FormularioReseña />} />
            <Route path="/estadisticas" element={<EstadisticasPersonales />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;