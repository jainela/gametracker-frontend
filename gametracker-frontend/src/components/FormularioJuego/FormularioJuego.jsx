import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './FormularioJuego.css';

const FormularioJuego = () => {
  const { isDarkMode, themeName } = useTheme();
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    horas: 0,
    rating: 0,
    completado: false,
    fechaAdquisicion: new Date().toISOString().split('T')[0],
    descripcion: '',
    dios: 'Apolo'
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generos = [
    'Aventura Épica', 'RPG Legendario', 'Estrategia Divina', 'Acción Heroica',
    'Metroidvania Oscuro', 'Horror Gótico', 'Mitología Nórdica', 'Roguelike Mitológico',
    'Aventura Espiritual', 'Simulación Olímpica', 'Puzle Sagrado', 'Deporte Divino'
  ];

  const plataformas = [
    'PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Multiplataforma'
  ];

  const dioses = [
    { value: 'Apolo', icon: '☀️', desc: 'Juegos de luz, estrategia y gloria' },
    { value: 'Hécate', icon: '🌙', desc: 'Juegos de misterio, magia y oscuridad' },
    { value: 'Ambos', icon: '⚡', desc: 'Juegos que combinan ambas esencias' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Efecto visual de envío
    const form = e.target;
    form.classList.add('submitting');
    
    // Simular envío épico
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Forjando nueva leyenda:', formData);
    alert(`¡Leyenda forjada! "${formData.titulo}" ha sido añadido a tu biblioteca.`);
    
    // Resetear formulario
    setFormData({
      titulo: '',
      genero: '',
      plataforma: '',
      horas: 0,
      rating: 0,
      completado: false,
      fechaAdquisicion: new Date().toISOString().split('T')[0],
      descripcion: '',
      dios: 'Apolo'
    });
    
    form.classList.remove('submitting');
    setIsSubmitting(false);
  };

  const getTempleQuote = () => {
    const quotes = {
      apolo: [
        "Forja tu leyenda bajo la luz del sol",
        "Cada juego es un poema esperando ser escrito",
        "La gloria aguarda a los valientes",
        "Que Apolo bendiga tu nueva aventura"
      ],
      hecate: [
        "Teje tu destino bajo el manto de la luna",
        "Los misterios aguardan a los audaces",
        "La oscuridad revela verdades ocultas",
        "Que Hécate guíe tu camino gaming"
      ]
    };
    
    const currentQuotes = isDarkMode ? quotes.hecate : quotes.apolo;
    return currentQuotes[Math.floor(Math.random() * currentQuotes.length)];
  };

  return (
    <div className="formulario-container">
      {/* Header épico del formulario */}
      <header className="formulario-header">
        <div className="forge-banner">
          <h1 className="epic-text gold-text text-glow">⚔️ FORJAR NUEVA LEYENDA</h1>
          <div className="forge-icon float-effect">🔥</div>
        </div>
        <p className="temple-instruction">{getTempleQuote()}</p>
        <p className="form-subtitle">
          Completa los campos sagrados para añadir una nueva leyenda a tu biblioteca
        </p>
      </header>

      <div className="form-layout">
        {/* Formulario principal */}
        <form className="formulario-juego" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">📜 Información Básica</h3>
            
            {/* Título */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🏷️</span>
                Nombre de la Leyenda
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="input-field"
                placeholder="Ej: The Legend of Zelda: Breath of the Wild"
                required
              />
            </div>

            {/* Género y Plataforma */}
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">🎭</span>
                  Género Épico
                </label>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Selecciona un género...</option>
                  {generos.map(genero => (
                    <option key={genero} value={genero}>{genero}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">🎮</span>
                  Plataforma Divina
                </label>
                <select
                  name="plataforma"
                  value={formData.plataforma}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Selecciona plataforma...</option>
                  {plataformas.map(plat => (
                    <option key={plat} value={plat}>{plat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Descripción */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">📖</span>
                Crónica de la Leyenda
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="input-field textarea-field"
                placeholder="Describe tu épica aventura, tus hazañas y los desafíos que enfrentaste..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">⭐ Progreso del Héroe</h3>
            
            {/* Horas y Rating */}
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">⏱️</span>
                  Horas de Gloria
                </label>
                <input
                  type="number"
                  name="horas"
                  value={formData.horas}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  max="1000"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">⭐</span>
                  Calificación Divina
                </label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="rating-text">{formData.rating}/5</span>
                </div>
              </div>
            </div>

            {/* Completado y Fecha */}
            <div className="input-row">
              <div className="input-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="completado"
                    checked={formData.completado}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    <span className="checkbox-icon">✅</span>
                    Leyenda Consumada
                  </span>
                </label>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">📅</span>
                  Fecha de Adquisición
                </label>
                <input
                  type="date"
                  name="fechaAdquisicion"
                  value={formData.fechaAdquisicion}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">🙏 Bendición Divina</h3>
            
            {/* Selección de Dios */}
            <div className="dioses-container">
              {dioses.map(dios => (
                <label key={dios.value} className="dios-option">
                  <input
                    type="radio"
                    name="dios"
                    value={dios.value}
                    checked={formData.dios === dios.value}
                    onChange={handleChange}
                    className="dios-input"
                  />
                  <div className={`dios-card ${formData.dios === dios.value ? 'active' : ''}`}>
                    <div className="dios-icon">{dios.icon}</div>
                    <div className="dios-info">
                      <div className="dios-name">{dios.value}</div>
                      <div className="dios-desc">{dios.desc}</div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Acciones del formulario */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-magic btn-preview"
              onClick={() => setShowPreview(!showPreview)}
            >
              <span className="btn-icon">👁️</span>
              {showPreview ? 'Ocultar' : 'Ver'} Previa
            </button>
            
            <button
              type="submit"
              className="btn btn-epic btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-icon">⚡</span>
                  Forjando Leyenda...
                </>
              ) : (
                <>
                  <span className="btn-icon">🔥</span>
                  Forjar Leyenda
                </>
              )}
            </button>
          </div>
        </form>

        {/* Vista previa épica */}
        {showPreview && (
          <div className="preview-container">
            <h3 className="preview-title">👁️ VISTA PREVIA DE LA LEYENDA</h3>
            <div className="preview-card">
              <div className="preview-header">
                <h4 className="preview-name">{formData.titulo || 'Nombre de la Leyenda'}</h4>
                <div className="preview-platform">
                  {formData.plataforma ? getPlatformIcon(formData.plataforma) : '🎮'}
                </div>
              </div>
              
              <div className="preview-badges">
                <div className={`preview-badge god-${formData.dios.toLowerCase()}`}>
                  {formData.dios === 'Apolo' ? '☀️' : formData.dios === 'Hécate' ? '🌙' : '⚡'} 
                  {formData.dios}
                </div>
                <div className={`preview-badge status-${formData.completado ? 'completado' : 'progreso'}`}>
                  {formData.completado ? '✅ Completado' : '⏳ En Progreso'}
                </div>
              </div>
              
              <div className="preview-stats">
                <div className="preview-stat">
                  <span>⏱️</span>
                  <span>{formData.horas}h</span>
                </div>
                <div className="preview-stat">
                  <span>⭐</span>
                  <span>{formData.rating}/5</span>
                </div>
                <div className="preview-stat">
                  <span>🎭</span>
                  <span>{formData.genero || 'Género'}</span>
                </div>
              </div>
              
              {formData.descripcion && (
                <div className="preview-desc">
                  <p>{formData.descripcion}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Efectos de partículas de forja */}
      <div className="forge-particles">
        <div className="forge-particle"></div>
        <div className="forge-particle"></div>
        <div className="forge-particle"></div>
      </div>
    </div>
  );
};

// Función auxiliar para íconos de plataforma
const getPlatformIcon = (platform) => {
  const icons = {
    'PC': '💻',
    'PlayStation': '🎮',
    'Xbox': '🎮', 
    'Nintendo Switch': '🎮',
    'Multiplataforma': '🌐'
  };
  return icons[platform] || '🎮';
};

export default FormularioJuego;