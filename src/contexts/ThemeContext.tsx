import React, { createContext, useContext, ReactNode } from 'react';
import { colors, componentColors, themeConfig } from '../styles/colors';

interface ThemeContextType {
  colors: typeof colors;
  componentColors: typeof componentColors;
  themeConfig: typeof themeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const value = {
    colors,
    componentColors,
    themeConfig,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 