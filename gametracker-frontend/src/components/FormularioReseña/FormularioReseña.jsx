import React, { useState, useMemo, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './FormularioReseña.css';

const FormularioReseña = () => {
  const { isDarkMode, themeName } = useTheme();
  const [formData, setFormData] = useState({
    diosSeleccionado: '',
    juegoSeleccionado: '',
    rating: 0,
    titulo: '',
    contenido: '',
    autor: '',
    tags: [],
    horasJugadas: 0,
    completado: false,
    plataforma: ''
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Datos optimizados con useMemo
  const juegos = useMemo(() => [
    {
      id: 1,
      titulo: 'The Legend of Zelda: Breath of the Wild',
      genero: 'Aventura Épica',
      plataforma: 'Nintendo Switch'
    },
    {
      id: 2,
      titulo: 'Hollow Knight',
      genero: 'Metroidvania Oscuro',
      plataforma: 'PC'
    },
    {
      id: 3,
      titulo: 'God of War',
      genero: 'Mitología Nórdica',
      plataforma: 'PlayStation'
    },
    {
      id: 4,
      titulo: 'Bloodborne',
      genero: 'Horror Gótico',
      plataforma: 'PlayStation'
    },
    {
      id: 5,
      titulo: 'Hades',
      genero: 'Roguelike Mitológico',
      plataforma: 'Multiplataforma'
    },
    {
      id: 6,
      titulo: 'Journey',
      genero: 'Aventura Espiritual',
      plataforma: 'PlayStation'
    }
  ], []);

  const dioses = useMemo(() => [
    {
      value: 'Apolo',
      icon: '☀️',
      nombre: 'Apolo',
      descripcion: 'Luz, Verdad y Claridad',
      color: 'gold'
    },
    {
      value: 'Hécate',
      icon: '🌙',
      nombre: 'Hécate',
      descripcion: 'Misterio, Profundidad y Magia',
      color: 'purple'
    },
    {
      value: 'Ambos',
      icon: '⚡',
      nombre: 'Ambos',
      descripcion: 'Equilibrio y Sabiduría Completa',
      color: 'both'
    }
  ], []);

  const plataformas = ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Multiplataforma'];

  // Handlers optimizados con useCallback
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleRatingChange = useCallback((rating) => {
    handleInputChange('rating', rating);
  }, [handleInputChange]);

  const handleTagAdd = useCallback(() => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      handleInputChange('tags', [...formData.tags, currentTag.trim()]);
      setCurrentTag('');
    }
  }, [currentTag, formData.tags, handleInputChange]);

  const handleTagRemove = useCallback((tagToRemove) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  }, [formData.tags, handleInputChange]);

  const handleTagKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  }, [handleTagAdd]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.diosSeleccionado) {
      alert('🏛️ Debes elegir un dios patrón para tu crónica');
      return;
    }

    if (!formData.juegoSeleccionado) {
      alert('🎮 Debes seleccionar una leyenda para criticar');
      return;
    }

    setIsSubmitting(true);

    // Simular envío épico
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('📜 Crónica inmortalizada:', formData);
    alert(`✨ ¡Tu crónica ha sido inmortalizada bajo la bendición de ${formData.diosSeleccionado}!`);

    // Resetear formulario
    setFormData({
      diosSeleccionado: '',
      juegoSeleccionado: '',
      rating: 0,
      titulo: '',
      contenido: '',
      autor: '',
      tags: [],
      horasJugadas: 0,
      completado: false,
      plataforma: ''
    });
    setCurrentTag('');
    setIsSubmitting(false);
  }, [formData]);

  const handleReset = useCallback(() => {
    if (confirm('¿Estás seguro de que deseas descartar esta crónica?')) {
      setFormData({
        diosSeleccionado: '',
        juegoSeleccionado: '',
        rating: 0,
        titulo: '',
        contenido: '',
        autor: '',
        tags: [],
        horasJugadas: 0,
        completado: false,
        plataforma: ''
      });
      setCurrentTag('');
    }
  }, []);

  // Estadísticas en tiempo real con useMemo
  const estadisticas = useMemo(() => {
    const palabras = formData.contenido.trim() ? formData.contenido.split(/\s+/).length : 0;
    const caracteres = formData.contenido.length;
    const densidad = palabras > 0 ? Math.round((caracteres / palabras) * 10) / 10 : 0;
    
    return { palabras, caracteres, densidad };
  }, [formData.contenido]);

  const getConsejoOraculo = useCallback(() => {
    if (!formData.diosSeleccionado) {
      return "Elige un dios patrón para inspirar tu escritura";
    }

    const consejos = {
      Apolo: [
        "Que la luz de la verdad guíe cada palabra",
        "La claridad y precisión honran a Apolo",
        "Escribe con la brillantez del sol naciente",
        "La honestidad es el mayor tributo a la luz"
      ],
      Hécate: [
        "Deja que los misterios fluyan en tu pluma",
        "La profundidad revela las verdades ocultas",
        "Escribe con la magia de la luna llena",
        "Los secretos mejor guardados merecen ser contados"
      ],
      Ambos: [
        "Equilibra la luz y la oscuridad en tu narrativa",
        "La sabiduría completa abraza todas las perspectivas",
        "Combina claridad con misterio en tu relato",
        "La verdad absoluta contiene tanto luz como sombra"
      ]
    };

    const diosConsejos = consejos[formData.diosSeleccionado] || [];
    return diosConsejos[Math.floor(Math.random() * diosConsejos.length)];
  }, [formData.diosSeleccionado]);

  const getJuegoSeleccionado = useCallback(() => {
    return juegos.find(juego => juego.titulo === formData.juegoSeleccionado);
  }, [formData.juegoSeleccionado, juegos]);

  const isFormValid = useMemo(() => {
    return formData.diosSeleccionado && formData.juegoSeleccionado;
  }, [formData.diosSeleccionado, formData.juegoSeleccionado]);

  return (
    <div className="templo-escritura">
      <div className="atalaya-cronista">
        {/* Header Épico */}
        <div className="rollo-principal">
          <h1>✍️ TABLILLA DEL CRONISTA</h1>
          <p className="instruccion-oraculo">
            {isDarkMode 
              ? "Que Hécate inspire tus palabras en la oscuridad" 
              : "Que Apolo guíe tu pluma bajo la luz de la verdad"
            }
          </p>
        </div>

        {/* Selección Divina Mejorada */}
        <div className="seleccion-divina">
          <h3 className="titulo-seccion">🏛️ BAJO EL PATROCINIO DIVINO</h3>
          <p className="subtitulo-seccion">Elige la deidad que inspirará tu crónica</p>
          
          <div className="dioses-opciones">
            {dioses.map(dios => (
              <button 
                key={dios.value}
                type="button"
                className={`opcion-dios ${dios.color} ${formData.diosSeleccionado === dios.value ? 'seleccionado' : ''}`}
                onClick={() => handleInputChange('diosSeleccionado', dios.value)}
              >
                <span className="icono-dios">{dios.icon}</span>
                <span className="texto-dios">{dios.nombre}</span>
                <span className="descripcion-dios">{dios.descripcion}</span>
                {formData.diosSeleccionado === dios.value && (
                  <div className="seleccion-indicador">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario de Escritura Mejorado */}
        <form className="papiro-formulario" onSubmit={handleSubmit}>
          {/* Información del Juego */}
          <div className="seccion-formulario">
            <h4 className="titulo-seccion-interna">🎮 LA LEYENDA ELEGIDA</h4>
            
            <div className="campos-grid">
              <div className="campo-sagrado">
                <label className="label-epico">
                  <span className="label-icon">⚔️</span>
                  Leyenda a Críticar
                </label>
                <select 
                  className="select-divino"
                  value={formData.juegoSeleccionado}
                  onChange={(e) => handleInputChange('juegoSeleccionado', e.target.value)}
                  required
                >
                  <option value="">Selecciona una epopeya...</option>
                  {juegos.map(juego => (
                    <option key={juego.id} value={juego.titulo}>
                      {juego.titulo} - {juego.genero}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-sagrado">
                <label className="label-epico">
                  <span className="label-icon">🎮</span>
                  Plataforma
                </label>
                <select 
                  className="select-divino"
                  value={formData.plataforma}
                  onChange={(e) => handleInputChange('plataforma', e.target.value)}
                >
                  <option value="">Selecciona plataforma...</option>
                  {plataformas.map(plat => (
                    <option key={plat} value={plat}>{plat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="campos-grid">
              <div className="campo-sagrado">
                <label className="label-epico">
                  <span className="label-icon">⏱️</span>
                  Horas de Gloria
                </label>
                <input 
                  type="number" 
                  className="input-epico"
                  value={formData.horasJugadas}
                  onChange={(e) => handleInputChange('horasJugadas', parseInt(e.target.value) || 0)}
                  min="0"
                  max="1000"
                />
              </div>

              <div className="campo-sagrado">
                <label className="checkbox-label">
                  <input 
                    type="checkbox"
                    className="checkbox-input"
                    checked={formData.completado}
                    onChange={(e) => handleInputChange('completado', e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    <span className="checkbox-icon">✅</span>
                    Leyenda Consumada
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Rating Épico */}
          <div className="seccion-formulario">
            <h4 className="titulo-seccion-interna">⭐ NIVEL DE GLORIA</h4>
            
            <div className="campo-sagrado">
              <div className="estrellas-container">
                <div className="estrellas-input">
                  {[1, 2, 3, 4, 5].map(estrella => (
                    <button 
                      key={estrella}
                      type="button"
                      className={`btn-estrella ${formData.rating >= estrella ? 'activa' : ''}`}
                      onClick={() => handleRatingChange(estrella)}
                    >
                      {formData.rating >= estrella ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
                <span className="rating-texto">
                  {formData.rating > 0 ? `${formData.rating}/5 estrellas` : 'Sin calificar'}
                </span>
              </div>
            </div>
          </div>

          {/* Contenido de la Reseña */}
          <div className="seccion-formulario">
            <h4 className="titulo-seccion-interna">📜 TU CRÓNICA SAGRADA</h4>
            
            <div className="campo-sagrado">
              <label className="label-epico">
                <span className="label-icon">🏷️</span>
                Título de tu Crónica
              </label>
              <input 
                type="text" 
                className="input-epico"
                placeholder="Un título épico para tu reseña..."
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                maxLength="100"
              />
              <div className="contador-caracteres">
                {formData.titulo.length}/100
              </div>
            </div>

            <div className="campo-sagrado">
              <label className="label-epico">
                <span className="label-icon">📖</span>
                Tu Relato Legendario
              </label>
              <textarea 
                className="textarea-epico"
                placeholder="Describe tus hazañas, reflexiones, secretos descubiertos, momentos memorables..."
                value={formData.contenido}
                onChange={(e) => handleInputChange('contenido', e.target.value)}
                rows="6"
                required
              ></textarea>
              <div className="estadisticas-escritura">
                <span className="estadistica">{estadisticas.palabras} palabras</span>
                <span className="estadistica">{estadisticas.caracteres} caracteres</span>
                <span className="estadistica">Densidad: {estadisticas.densidad}</span>
              </div>
            </div>

            {/* Tags Interactivos */}
            <div className="campo-sagrado">
              <label className="label-epico">
                <span className="label-icon">🔖</span>
                Sellos de la Experiencia
              </label>
              <div className="tags-container">
                <div className="tags-input">
                  <input 
                    type="text"
                    className="input-tag"
                    placeholder="Añadir sello (ej: 'Desafiante', 'Emocionante')"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    maxLength="20"
                  />
                  <button 
                    type="button"
                    className="btn-agregar-tag"
                    onClick={handleTagAdd}
                    disabled={!currentTag.trim()}
                  >
                    +
                  </button>
                </div>
                <div className="tags-list">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                      #{tag}
                      <button 
                        type="button"
                        className="btn-eliminar-tag"
                        onClick={() => handleTagRemove(tag)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información del Autor */}
          <div className="seccion-formulario">
            <h4 className="titulo-seccion-interna">👤 FIRMA DEL HÉROE</h4>
            
            <div className="campo-sagrado">
              <label className="label-epico">
                <span className="label-icon">✍️</span>
                Tu Nombre Legendario
              </label>
              <input 
                type="text" 
                className="input-epico"
                placeholder="Cómo quieres ser recordado..."
                value={formData.autor}
                onChange={(e) => handleInputChange('autor', e.target.value)}
              />
            </div>
          </div>

          {/* Vista Previa Rápida */}
          {formData.juegoSeleccionado && (
            <div className="vista-previa-rapida">
              <h4 className="titulo-seccion-interna">👁️ VISTA PREVIA</h4>
              <div className="previa-contenido">
                <div className="previa-juego">
                  <strong>Leyenda:</strong> {formData.juegoSeleccionado}
                </div>
                {formData.titulo && (
                  <div className="previa-titulo">
                    <strong>Título:</strong> "{formData.titulo}"
                  </div>
                )}
                {formData.rating > 0 && (
                  <div className="previa-rating">
                    <strong>Gloria:</strong> {'⭐'.repeat(formData.rating)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Acciones Finales Mejoradas */}
          <div className="acciones-finales">
            <button 
              type="button"
              className="btn btn-descansar"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              <span className="btn-icon">🏛️</span>
              <span className="btn-text">Descansar Pluma</span>
            </button>
            
            <button 
              type="submit"
              className="btn btn-inmortalizar"
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-icon">⚡</span>
                  <span className="btn-text">Inmortalizando...</span>
                </>
              ) : (
                <>
                  <span className="btn-icon">💫</span>
                  <span className="btn-text">Inmortalizar Crónica</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Consejo del Oráculo Mejorado */}
        <div className={`consejo-oraculo ${formData.diosSeleccionado ? 'activo' : ''}`}>
          <div className="oraculo-header">
            <div className="oraculo-icono">🔮</div>
            <span className="oraculo-titulo">SABIDURÍA DEL ORÁCULO</span>
          </div>
          <p className="consejo-texto">{getConsejoOraculo()}</p>
          {formData.diosSeleccionado && (
            <div className="oraculo-bendicion">
              {formData.diosSeleccionado === 'Apolo' && '☀️ Que la luz guíe tu pluma'}
              {formData.diosSeleccionado === 'Hécate' && '🌙 Que la magia fluya en tus palabras'}
              {formData.diosSeleccionado === 'Ambos' && '⚡ Que el equilibrio inspire tu relato'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormularioReseña;