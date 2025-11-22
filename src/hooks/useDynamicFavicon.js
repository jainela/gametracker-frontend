import { useEffect } from 'react';

export const useDynamicFavicon = (isDarkMode) => {
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    const favicon = document.querySelector("link[rel*='icon']");
    
    if (favicon) {
      favicon.href = `/favicon-${theme}.ico`;
    }
  }, [isDarkMode]);
};