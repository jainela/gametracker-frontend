import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('apollo')

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'apollo' ? 'hecate' : 'apollo')
  }

  const value = {
    currentTheme,
    toggleTheme,
    isApollo: currentTheme === 'apollo',
    isHecate: currentTheme === 'hecate'
  }

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${currentTheme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}