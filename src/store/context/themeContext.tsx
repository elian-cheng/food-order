import React, { useState, createContext, useContext } from 'react';

interface ThemeContextInt {
  isDark: boolean;
  themeSwitcher: () => void;
}

export const ThemeContext = createContext<ThemeContextInt>({
  isDark: true,
  themeSwitcher: () => {},
});

export const ThemeProvider = (props: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  const themeSwitchHandler = () => {
    setIsDark((prevState) => !prevState);
  };

  const contextValue = {
    isDark: isDark,
    themeSwitcher: themeSwitchHandler,
  };

  return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
};

export function useThemeSwitcher() {
  return useContext(ThemeContext);
}
