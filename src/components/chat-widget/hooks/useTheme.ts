import { useState } from 'react';
import { ThemeType } from '../types';

export function useTheme(initialTheme: ThemeType = 'dark') {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme
  };
}