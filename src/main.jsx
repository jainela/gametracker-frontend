import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Polyfills esenciales
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Cargar polyfills condicionalmente
const loadPolyfills = async () => {
  if (typeof window === 'undefined') return;

  // Polyfill para ResizeObserver
  if (typeof ResizeObserver === 'undefined') {
    try {
      const { default: ResizeObserver } = await import('resize-observer-polyfill');
      window.ResizeObserver = ResizeObserver;
      console.log('✅ ResizeObserver polyfill loaded');
    } catch (error) {
      console.warn('❌ ResizeObserver polyfill failed, using fallback');
      window.ResizeObserver = class ResizeObserver {
        constructor(callback) { this.callback = callback; }
        observe() { /* no-op */ }
        unobserve() {}
        disconnect() {}
      };
    }
  }

  // Polyfill para IntersectionObserver
  if (typeof IntersectionObserver === 'undefined') {
    try {
      await import('intersection-observer');
      console.log('✅ IntersectionObserver polyfill loaded');
    } catch (error) {
      console.warn('❌ IntersectionObserver polyfill failed');
    }
  }

  // Polyfill para smooth scroll
  if (!('scrollBehavior' in document.documentElement.style)) {
    try {
      const smoothscroll = await import('smoothscroll-polyfill');
      smoothscroll.polyfill();
      console.log('✅ Smoothscroll polyfill loaded');
    } catch (error) {
      console.warn('❌ Smoothscroll polyfill failed');
    }
  }

  // Polyfill para fetch (solo si es necesario)
  if (typeof fetch === 'undefined') {
    try {
      await import('whatwg-fetch');
      console.log('✅ Fetch polyfill loaded');
    } catch (error) {
      console.warn('❌ Fetch polyfill failed');
    }
  }
};

// Inicialización de la aplicación
const initializeApp = async () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }

  try {
    // Cargar polyfills primero
    await loadPolyfills();
    
    // Renderizar la aplicación
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    console.log('🎮 GameTracker iniciado correctamente');

  } catch (error) {
    console.error('❌ Error inicializando la app:', error);
    
    // Fallback: intentar renderizar sin polyfills
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

// Manejo de errores global
window.addEventListener('error', (event) => {
  console.error('🚨 Error global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
});

// Iniciar la aplicación
initializeApp();