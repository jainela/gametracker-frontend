/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

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
  const audioContextRef = useRef(null);

  const playThemeSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Sonido diferente para cada tema
    if (isDarkMode) {
      // Sonido de transición a Apolo (más brillante)
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(392, context.currentTime); // Sol
      oscillator.frequency.exponentialRampToValueAtTime(523.25, context.currentTime + 0.5); // Do
    } else {
      // Sonido de transición a Hécate (más misterioso)
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(329.63, context.currentTime); // Mi
      oscillator.frequency.exponentialRampToValueAtTime(261.63, context.currentTime + 0.5); // Do
    }

    gainNode.gain.setValueAtTime(0.1, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
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
    // Efecto de sonido
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
        : "Bajo el sol, Apolo bendice tu destreza gaming"
    }}>
      <div className={`${isDarkMode ? 'theme-hecate' : 'theme-apolo'} ${themeTransition ? 'theme-changing' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};