import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Theme types
type Theme = 'dark' | 'light';

// Context interface with theme state and toggle function
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get system preference for dark/light mode
const getSystemThemePreference = (): Theme => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark'; // Default to dark if matchMedia is not available
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Default to system preference, with fallback to dark mode
  const [theme, setTheme] = useState<Theme>('dark');
  const isDark = theme === 'dark';

  // Apply theme to document element on change
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the previous theme class
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Update the color-scheme meta tag for proper system UI
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', theme);
  }, [theme]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Try to get theme from localStorage first
    const savedTheme = localStorage.getItem('ncsc-theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Otherwise use system preference
      const systemTheme = getSystemThemePreference();
      setTheme(systemTheme);
      localStorage.setItem('ncsc-theme', systemTheme);
    }
    
    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply system theme changes if user hasn't explicitly set a preference
      if (!localStorage.getItem('ncsc-theme-user-set')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('ncsc-theme', newTheme);
      }
    };
    
    // Add change listener if supported
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('ncsc-theme', newTheme);
    localStorage.setItem('ncsc-theme-user-set', 'true');
    
    // Log theme change for debugging
    console.log(`[NCSC] Theme changed to ${newTheme} mode`);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
