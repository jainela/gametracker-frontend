import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

// Hook para favicon dinámico optimizado
const useDynamicFavicon = (isDarkMode) => {
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    const favicon = document.querySelector("link[rel*='icon']");
    
    if (favicon) {
      // Usar favicon por defecto si no existe el específico del tema
      const faviconPath = `/favicon-${theme}.ico`;
      
      // Preload del favicon para mejor performance
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = faviconPath;
      link.as = 'image';
      document.head.appendChild(link);
      
      favicon.href = faviconPath;
      
      // Cleanup
      return () => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      };
    }
  }, [isDarkMode]);
};

// Hook para sonidos optimizado
const useThemeSounds = () => {
  const audioContextRef = useRef(null);
  
  const playThemeSound = useCallback((isDarkMode) => {
    // Solo reproducir sonido en dispositivos no móviles para mejor performance
    if (window.innerWidth < 768) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      // Resumir contexto si está suspendido
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      // Sonidos optimizados para cada tema
      if (isDarkMode) {
        // Sonido místico para Hécate
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(392, context.currentTime); // Sol
        oscillator.frequency.exponentialRampToValueAtTime(523.25, context.currentTime + 0.3); // Do
      } else {
        // Sonido brillante para Apolo
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(329.63, context.currentTime); // Mi
        oscillator.frequency.exponentialRampToValueAtTime(261.63, context.currentTime + 0.3); // Do
      }

      // Configuración de volumen más suave
      gainNode.gain.setValueAtTime(0.05, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.3);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.3);

      // Cleanup
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.log('Audio no disponible:', error.message);
    }
  }, []);

  // Cleanup del audio context
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return playThemeSound;
};

// Hook para scroll parallax optimizado
const useParallaxEffect = () => {
  useEffect(() => {
    if (window.innerWidth < 768) return; // Desactivar en móvil para performance
    
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;
      
      const scrolled = window.scrollY > 30;
      const currentlyScrolled = navbar.classList.contains('scrolled');
      
      if (scrolled !== currentlyScrolled) {
        navbar.classList.toggle('scrolled', scrolled);
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
    
    // Ejecutar una vez al montar
    handleScroll();
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);
};

// Hook para sincronización con sistema
const useSystemThemeSync = (setIsDarkMode) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemChange = (e) => {
      const saved = localStorage.getItem('gameTracker-theme');
      // Solo cambiar si no hay preferencia guardada explícita
      if (saved === null) {
        setIsDarkMode(e.matches);
      }
    };

    // Usar addEventListener con soporte moderno y fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange); // Fallback para navegadores antiguos
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, [setIsDarkMode]);
};

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
    
    try {
      const saved = localStorage.getItem('gameTracker-theme');
      if (saved !== null) return JSON.parse(saved);
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
    }
    
    // Fallback a preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark;
  });

  const [themeTransition, setThemeTransition] = useState(false);
  
  // Hooks personalizados
  useDynamicFavicon(isDarkMode);
  const playThemeSound = useThemeSounds();
  useParallaxEffect();
  useSystemThemeSync(setIsDarkMode);

  // Aplicar tema al documento
  useEffect(() => {
    const applyTheme = () => {
      try {
        localStorage.setItem('gameTracker-theme', JSON.stringify(isDarkMode));
      } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
      }
      
      // Aplicar clases al body
      const bodyClass = isDarkMode ? 'theme-hecate temple-hecate' : 'theme-apolo temple-apolo';
      document.body.className = bodyClass;
      
      // Actualizar título
      document.title = `GameTracker - ${isDarkMode ? '🌙 Santuario de Hécate' : '☀️ Templo de Apolo'}`;
      
      // Actualizar meta theme-color para PWA
      const themeColor = isDarkMode ? '#1a1a2e' : '#fbf8eb';
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', themeColor);
      }
    };

    // Efecto de transición suave
    setThemeTransition(true);
    const transitionTimer = setTimeout(() => setThemeTransition(false), 500);
    
    applyTheme();
    
    return () => clearTimeout(transitionTimer);
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    // Efectos de transición
    playThemeSound(!isDarkMode);
    
    // Añadir clase de transición
    document.body.classList.add('theme-changing');
    const removeTransitionClass = () => {
      document.body.classList.remove('theme-changing');
    };
    setTimeout(removeTransitionClass, 500);
    
    console.log(`🎮 Cambiando al templo de ${isDarkMode ? 'Apolo ☀️' : 'Hécate 🌙'}...`);
    setIsDarkMode(prev => !prev);
  }, [isDarkMode, playThemeSound]);

  const themeValue = {
    isDarkMode, 
    toggleTheme,
    themeName: isDarkMode ? 'Hécate' : 'Apolo',
    themeIcon: isDarkMode ? '🌙' : '☀️',
    themeTransition,
    themeQuote: isDarkMode 
      ? "Bajo el manto de Hécate, tus juegos encuentran misterio" 
      : "Bajo la luz de Apolo, tus juegos alcanzan la gloria",
    themeDescription: isDarkMode
      ? "Santuario oscuro donde los juegos cobran vida en la noche"
      : "Templo dorado donde los juegos brillan con honor"
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div 
        className={`
          theme-container 
          ${isDarkMode ? 'theme-hecate' : 'theme-apolo'} 
          ${themeTransition ? 'theme-changing' : ''}
        `}
        data-theme={isDarkMode ? 'dark' : 'light'}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Exportar el contexto para uso directo si es necesario
export { ThemeContext };