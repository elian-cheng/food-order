import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Colors from './theme/colors';
import { createTheme, ThemeProvider } from '@mui/material';
import Router from './routing/Router/Router';
import { useThemeSwitcher } from './store/context/themeContext';
import './styles.scss';

function App() {
  const { isDark } = useThemeSwitcher();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          secondary: {
            main: Colors.SECONDARY_MAIN,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: `${isDark ? Colors.SECONDARY_MAIN : Colors.SECONDARY_DARK}`,
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: `${isDark ? Colors.SECONDARY_MAIN : Colors.SECONDARY_DARK}`,
              },
            },
          },
        },
      }),
    [isDark]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
