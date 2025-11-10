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
    // Verificar preferencia guardada o del sistema
    if (typeof window === 'undefined') return false;
    
    const saved = localStorage.getItem('gameTracker-theme');
    if (saved !== null) return JSON.parse(saved);
    
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark;
  });

  const [themeTransition, setThemeTransition] = useState(false);
  const audioContextRef = useRef(null);

  const playThemeSound = () => {
    // Solo reproducir sonido en dispositivos no móviles para mejor performance
    if (window.innerWidth < 768) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      // Sonido optimizado para cada tema
      if (isDarkMode) {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(392, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(523.25, context.currentTime + 0.4);
      } else {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(329.63, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(261.63, context.currentTime + 0.4);
      }

      gainNode.gain.setValueAtTime(0.08, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.4);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.4);
    } catch (error) {
      console.log('Audio no disponible en este dispositivo');
    }
  };

  useEffect(() => {
    // Guardar preferencia y aplicar tema
    localStorage.setItem('gameTracker-theme', JSON.stringify(isDarkMode));
    
    // Efecto de transición suave
    setThemeTransition(true);
    const timer = setTimeout(() => setThemeTransition(false), 500);
    
    // Aplicar clases al body
    const bodyClass = isDarkMode ? 'theme-hecate temple-hecate' : 'theme-apolo temple-apolo';
    document.body.className = bodyClass;
    document.title = `GameTracker ${isDarkMode ? '🌙 Santuario de Hécate' : '☀️ Templo de Apolo'}`;
    
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Efectos de transición
    playThemeSound();
    document.body.classList.add('theme-changing');
    setTimeout(() => document.body.classList.remove('theme-changing'), 500);
    
    console.log(`🔮 Cambiando al templo de ${isDarkMode ? 'Apolo' : 'Hécate'}...`);
    setIsDarkMode(!isDarkMode);
  };

  // Sincronizar con preferencias del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const saved = localStorage.getItem('gameTracker-theme');
      // Solo cambiar si no hay preferencia guardada
      if (saved === null) {
        setIsDarkMode(e.matches);
      }
    };

    // Usar addEventListener con soporte moderno
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, []);

  // Efecto parallax optimizado para móvil
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) return; // Desactivar en móvil para performance
      
      const navbar = document.querySelector('.navbar');
      if (navbar && window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    // Throttle del scroll para mejor performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
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