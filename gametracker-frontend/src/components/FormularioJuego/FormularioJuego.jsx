import React, { useState, useEffect } from 'react';
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
    dios: 'Apolo',
    tags: [], // Nuevo campo para etiquetas
    portadaURL: '' // Nuevo campo para imagen
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentTag, setCurrentTag] = useState(''); // Para input temporal de tags

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Tags predefinidos sugeridos
  const suggestedTags = [
    'Multijugador', 'Un Jugador', 'Cooperativo', 'Competitivo', 'Mundo Abierto',
    'Lineal', 'Historia Rica', 'Grind', 'Relajante', 'Desafiante', 'Culto',
    'Indie', 'AAA', 'Retro', 'Moderno', 'Mods', 'Online', 'Offline'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar agregar tag
  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  // Manejar remover tag
  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Agregar tag sugerido
  const handleAddSuggestedTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  // Manejar entrada de tags con Enter
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  // FUNCIÓN ACTUALIZADA: Conectada a la API con tags e imagen
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('enviando');
    
    try {
      // Preparar datos para la API según el modelo Juego
      const juegoData = {
        nombre: formData.titulo,
        plataforma: formData.plataforma,
        genero: formData.genero,
        horasJugadas: parseInt(formData.horas) || 0,
        rating: parseInt(formData.rating) || 0,
        estado: formData.completado ? 'Completado' : 'Pendiente',
        dios: formData.dios,
        fechaAdquisicion: formData.fechaAdquisicion,
        portadaURL: formData.portadaURL || '', // Incluir URL de portada
        tags: formData.tags, // Incluir tags
        ultimaSesion: new Date().toISOString().split('T')[0]
      };

      // Enviar a la API
      const response = await fetch('http://localhost:3000/api/juegos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegoData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear el juego');
      }

      const juegoCreado = await response.json();
      
      setSubmitStatus('exito');
      alert(`¡Leyenda forjada! "${formData.titulo}" ha sido añadido a tu biblioteca.`);
      
      // Resetear formulario después de éxito
      setFormData({
        titulo: '',
        genero: '',
        plataforma: '',
        horas: 0,
        rating: 0,
        completado: false,
        fechaAdquisicion: new Date().toISOString().split('T')[0],
        descripcion: '',
        dios: 'Apolo',
        tags: [],
        portadaURL: ''
      });
      setCurrentTag('');
      
      // Ocultar preview después de éxito
      setShowPreview(false);

    } catch (error) {
      console.error('Error al crear juego:', error);
      setSubmitStatus('error');
      alert(`❌ Error al crear el juego: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      // Limpiar estado después de un tiempo
      setTimeout(() => setSubmitStatus(''), 3000);
    }
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

  // En móvil, no mostrar preview automáticamente
  useEffect(() => {
    if (isMobile) {
      setShowPreview(false);
    }
  }, [isMobile]);

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

  return (
    <div className="formulario-container">
      {/* Header épico del formulario */}
      <header className="formulario-header">
        <div className="forge-banner">
          <h1 className="epic-text gold-text text-glow">
            {isMobile ? '⚔️ NUEVA LEYENDA' : '⚔️ FORJAR NUEVA LEYENDA'}
          </h1>
          <div className="forge-icon float-effect">🔥</div>
        </div>
        <p className="temple-instruction">{getTempleQuote()}</p>
        <p className="form-subtitle">
          {isMobile 
            ? 'Completa los campos para añadir una nueva leyenda'
            : 'Completa los campos sagrados para añadir una nueva leyenda a tu biblioteca'
          }
        </p>

        {/* Indicador de estado del envío */}
        {submitStatus === 'enviando' && (
          <div className="submit-status enviando">
            ⚡ Forjando leyenda en los salones divinos...
          </div>
        )}
        {submitStatus === 'exito' && (
          <div className="submit-status exito">
            ✅ ¡Leyenda inmortalizada con éxito!
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="submit-status error">
            ❌ Error al forjar la leyenda
          </div>
        )}
      </header>

      <div className="form-layout">
        {/* Formulario principal */}
        <form className="formulario-juego" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">
              <span>📜</span>
              {isMobile ? 'Información Básica' : 'Información de la Leyenda'}
            </h3>
            
            {/* Título */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🏷️</span>
                {isMobile ? 'Nombre del Juego' : 'Nombre de la Leyenda'}
                <span className="required-asterisk">*</span>
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="input-field"
                placeholder={isMobile ? "Ej: Zelda: Breath of the Wild" : "Ej: The Legend of Zelda: Breath of the Wild"}
                required
                minLength="2"
                maxLength="100"
              />
            </div>

            {/* URL de la Portada */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🖼️</span>
                {isMobile ? 'URL de la Portada' : 'URL de la Portada Épica'}
              </label>
              <input
                type="url"
                name="portadaURL"
                value={formData.portadaURL}
                onChange={handleChange}
                className="input-field"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {formData.portadaURL && (
                <div className="image-preview">
                  <img 
                    src={formData.portadaURL} 
                    alt="Vista previa de portada" 
                    className="preview-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Género y Plataforma */}
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">🎭</span>
                  {isMobile ? 'Género' : 'Género Épico'}
                  <span className="required-asterisk">*</span>
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
                  {isMobile ? 'Plataforma' : 'Plataforma Divina'}
                  <span className="required-asterisk">*</span>
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
                {isMobile ? 'Descripción' : 'Crónica de la Leyenda'}
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="input-field textarea-field"
                placeholder={isMobile 
                  ? "Describe tu aventura..." 
                  : "Describe tu épica aventura, tus hazañas y los desafíos que enfrentaste..."
                }
                rows={isMobile ? "3" : "4"}
                maxLength="500"
              />
              <div className="char-counter">
                {formData.descripcion.length}/500 caracteres
              </div>
            </div>
          </div>

          {/* NUEVA SECCIÓN: Etiquetas */}
          <div className="form-section">
            <h3 className="section-title">
              <span>🏷️</span>
              {isMobile ? 'Etiquetas' : 'Sellos de la Leyenda'}
            </h3>
            
            <div className="input-group">
              <label className="input-label">
                <span className="label-icon">🔖</span>
                {isMobile ? 'Agregar Etiquetas' : 'Agregar Sellos de Honor'}
              </label>
              <div className="tags-input-container">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="input-field tags-input"
                  placeholder="Escribe una etiqueta y presiona Enter..."
                  maxLength="20"
                />
                <button
                  type="button"
                  className="btn btn-tag-add"
                  onClick={handleAddTag}
                  disabled={!currentTag.trim()}
                >
                  +
                </button>
              </div>
              
              {/* Tags agregados */}
              {formData.tags.length > 0 && (
                <div className="tags-container">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      <span className="tag-text">{tag}</span>
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => handleRemoveTag(tag)}
                        aria-label={`Remover etiqueta ${tag}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Tags sugeridos */}
              <div className="suggested-tags">
                <p className="suggested-tags-label">
                  <span className="label-icon">💡</span>
                  {isMobile ? 'Etiquetas sugeridas:' : 'Sellos sugeridos:'}
                </p>
                <div className="suggested-tags-container">
                  {suggestedTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`suggested-tag ${formData.tags.includes(tag) ? 'added' : ''}`}
                      onClick={() => handleAddSuggestedTag(tag)}
                      disabled={formData.tags.includes(tag)}
                    >
                      {tag}
                      {formData.tags.includes(tag) && ' ✓'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <span>⭐</span>
              {isMobile ? 'Tu Progreso' : 'Progreso del Héroe'}
            </h3>
            
            {/* Horas y Rating */}
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">⏱️</span>
                  {isMobile ? 'Horas Jugadas' : 'Horas de Gloria'}
                </label>
                <input
                  type="number"
                  name="horas"
                  value={formData.horas}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                  max="10000"
                  step="1"
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">⭐</span>
                  {isMobile ? 'Calificación' : 'Calificación Divina'}
                </label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      aria-label={`Calificar con ${star} estrella${star > 1 ? 's' : ''}`}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="rating-text">
                    {formData.rating > 0 ? `${formData.rating}/5` : 'Sin calificar'}
                  </span>
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
                    {isMobile ? 'Completado' : 'Leyenda Consumada'}
                  </span>
                </label>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">📅</span>
                  {isMobile ? 'Fecha' : 'Fecha de Adquisición'}
                </label>
                <input
                  type="date"
                  name="fechaAdquisicion"
                  value={formData.fechaAdquisicion}
                  onChange={handleChange}
                  className="input-field"
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <span>🙏</span>
              {isMobile ? 'Estilo' : 'Bendición Divina'}
            </h3>
            
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
                      <div className="dios-desc">
                        {isMobile ? dios.desc.split(' ').slice(0, 3).join(' ') + '...' : dios.desc}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Acciones del formulario */}
          <div className="form-actions">
            {!isMobile && (
              <button
                type="button"
                className="btn btn-magic btn-preview"
                onClick={() => setShowPreview(!showPreview)}
                disabled={isSubmitting}
              >
                <span className="btn-icon">👁️</span>
                {showPreview ? 'Ocultar' : 'Ver'} Previa
              </button>
            )}
            
            <button
              type="submit"
              className="btn btn-epic btn-submit"
              disabled={isSubmitting || !formData.titulo || !formData.genero || !formData.plataforma}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-icon">⚡</span>
                  {isMobile ? 'Forjando...' : 'Forjando Leyenda...'}
                </>
              ) : (
                <>
                  <span className="btn-icon">🔥</span>
                  {isMobile ? 'Crear' : 'Forjar Leyenda'}
                </>
              )}
            </button>

            {isMobile && (
              <button
                type="button"
                className="btn btn-magic btn-preview"
                onClick={() => setShowPreview(!showPreview)}
                disabled={isSubmitting}
              >
                <span className="btn-icon">👁️</span>
                {showPreview ? 'Ocultar' : 'Vista Previa'}
              </button>
            )}
          </div>
        </form>

        {/* Vista previa épica */}
        {showPreview && (
          <div className="preview-container">
            <h3 className="preview-title">
              {isMobile ? '👁️ VISTA PREVIA' : '👁️ VISTA PREVIA DE LA LEYENDA'}
            </h3>
            <div className="preview-card">
              {/* Portada en vista previa */}
              {formData.portadaURL && (
                <div className="preview-image-container">
                  <img 
                    src={formData.portadaURL} 
                    alt={`Portada de ${formData.titulo}`}
                    className="preview-cover-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="preview-header">
                <h4 className="preview-name">
                  {formData.titulo || 'Nombre de la Leyenda'}
                </h4>
                <div className="preview-platform">
                  {formData.plataforma ? getPlatformIcon(formData.plataforma) : '🎮'}
                </div>
              </div>
              
              <div className="preview-badges">
                <div className={`preview-badge god-${formData.dios.toLowerCase()}`}>
                  {formData.dios === 'Apolo' ? '☀️' : formData.dios === 'Hécate' ? '🌙' : '⚡'} 
                  {isMobile ? '' : ` ${formData.dios}`}
                </div>
                <div className={`preview-badge status-${formData.completado ? 'completado' : 'progreso'}`}>
                  {formData.completado ? '✅ Completado' : '⏳ En Progreso'}
                </div>
              </div>
              
              {/* Tags en vista previa */}
              {formData.tags.length > 0 && (
                <div className="preview-tags">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="preview-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="preview-stats">
                <div className="preview-stat">
                  <span>⏱️</span>
                  <span>{formData.horas || 0}h</span>
                </div>
                <div className="preview-stat">
                  <span>⭐</span>
                  <span>{formData.rating || 0}/5</span>
                </div>
                <div className="preview-stat">
                  <span>🎭</span>
                  <span>{formData.genero || 'Género'}</span>
                </div>
              </div>
              
              {formData.descripcion && (
                <div className="preview-desc">
                  <p>
                    {isMobile && formData.descripcion.length > 100 
                      ? `${formData.descripcion.substring(0, 100)}...` 
                      : formData.descripcion
                    }
                  </p>
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

export default FormularioJuego;