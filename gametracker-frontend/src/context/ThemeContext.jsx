import React, { createContext, useState, useEffect, useRef } from 'react';

// Importar sonidos (asegúrate de tener estos archivos en public/sounds/)
import liraSound from '../sounds/lira.mp3';
import hecateSound from '../sounds/hecate-magic.mp3';
import clickSound from '../sounds/click.mp3';
import hoverSound from '../sounds/hover.mp3';

export const ThemeContext = createContext();

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
  const [soundsEnabled, setSoundsEnabled] = useState(() => {
    const saved = localStorage.getItem('gameTracker-sounds');
    return saved ? JSON.parse(saved) : true;
  });

  const audioRefs = useRef({
    lira: null,
    hecate: null,
    click: null,
    hover: null
  });

  // Cargar sonidos
  useEffect(() => {
    audioRefs.current = {
      lira: new Audio(liraSound),
      hecate: new Audio(hecateSound),
      click: new Audio(clickSound),
      hover: new Audio(hoverSound)
    };

    // Configurar volumen
    Object.values(audioRefs.current).forEach(audio => {
      audio.volume = 0.3;
      audio.preload = 'auto';
    });

    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const playSound = (soundName) => {
    if (!soundsEnabled) return;
    
    const audio = audioRefs.current[soundName];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log('Error reproduciendo sonido:', e));
    }
  };

  const toggleSounds = () => {
    setSoundsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('gameTracker-sounds', JSON.stringify(newState));
      return newState;
    });
  };

  const playThemeSound = () => {
    if (isDarkMode) {
      // Sonido de lira para Apolo
      playSound('lira');
    } else {
      // Sonido mágico para Hécate
      playSound('hecate');
    }
  };

  const playClickSound = () => {
    playSound('click');
  };

  const playHoverSound = () => {
    playSound('hover');
  };

  useEffect(() => {
    localStorage.setItem('gameTracker-theme', JSON.stringify(isDarkMode));
    
    // Efecto de transición épica
    setThemeTransition(true);
    const timer = setTimeout(() => setThemeTransition(false), 600);
    
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
    // Efecto de sonido temático
    playThemeSound();
    
    // Efecto visual
    console.log(`🔮 Cambiando al templo de ${isDarkMode ? 'Apolo' : 'Hécate'}...`);
    
    // Agregar clase de transición al body
    document.body.classList.add('theme-changing');
    setTimeout(() => {
      document.body.classList.remove('theme-changing');
    }, 600);
    
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

  // Efecto parallax para el navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme,
      themeName: isDarkMode ? 'Hécate' : 'Apolo',
      themeTransition,
      themeQuote: isDarkMode 
        ? "En la oscuridad, Hécate guía tu camino gaming" 
        : "Bajo el sol, Apolo bendice tu destreza gaming",
      soundsEnabled,
      toggleSounds,
      playClickSound,
      playHoverSound
    }}>
      <div className={`${isDarkMode ? 'theme-hecate' : 'theme-apolo'} ${themeTransition ? 'theme-changing' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};