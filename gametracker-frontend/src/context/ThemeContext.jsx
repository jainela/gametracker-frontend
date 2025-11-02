import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('gameTracker-theme');
    
    if (saved === null) {
      return systemPrefersDark;
    }
    
    return JSON.parse(saved);
  });

  const [themeTransition, setThemeTransition] = useState(false);

  useEffect(() => {
    localStorage.setItem('gameTracker-theme', JSON.stringify(isDarkMode));
    
    // Efecto de transición épica
    setThemeTransition(true);
    const timer = setTimeout(() => setThemeTransition(false), 400);
    
    // Actualizar clases del body
    if (isDarkMode) {
      document.body.classList.add('theme-hecate', 'temple-hecate');
      document.body.classList.remove('theme-apolo', 'temple-apolo');
      document.title = "GameTracker 🌙 Santuario de Hécate";
    } else {
      document.body.classList.add('theme-apolo', 'temple-apolo');
      document.body.classList.remove('theme-hecate', 'temple-hecate');
      document.title = "GameTracker ☀️ Templo de Apolo";
    }
    
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Agregar efecto de sonido mental
    console.log(`🔮 Cambiando al templo de ${isDarkMode ? 'Apolo' : 'Hécate'}...`);
    setIsDarkMode(!isDarkMode);
  };

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const saved = localStorage.getItem('gameTracker-theme');
      if (saved === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme,
      themeName: isDarkMode ? 'Hécate' : 'Apolo',
      themeTransition,
      themeQuote: isDarkMode 
        ? "En la oscuridad, Hécate guía tu camino gaming" 
        : "Bajo el sol, Apolo bendice tu destreza gaming"
    }}>
      <div className={`${isDarkMode ? 'theme-hecate' : 'theme-apolo'} ${themeTransition ? 'theme-changing' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};