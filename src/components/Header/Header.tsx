import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Box,
  AppBar,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import classes from './Header.module.scss';
import COLORS from '../../theme/colors';

import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import { useThemeSwitcher } from '../../store/context/themeContext';
import Navigation from './components/Navigation/Navigation';
interface IHeader {
  wind?: () => Window;
  handleModal: MouseEventHandler<HTMLElement>;
}

export default function Header(props: IHeader) {
  const { wind, handleModal } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isDark } = useThemeSwitcher();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window && window.pageYOffset;
      if (currentScroll > 60) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window && window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          FoodOrder
        </Typography>
      </Box>
      <Divider />
      <Navigation handleModal={handleModal} />
    </Box>
  );

  const container = wind !== undefined ? () => wind().document.body : undefined;

  return (
    <header className={`${classes.header} ${isSticky ? classes['header__sticky'] : ''}`}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          component="nav"
          style={{
            background: 'inherit',
            color: `${isDark ? COLORS.SECONDARY_MAIN : COLORS.SECONDARY_DARK}`,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ marginRight: 'auto' }}>
              <Link to="/" style={{ display: 'flex' }}>
                <Typography
                  variant="h6"
                  component="span"
                  color={isDark ? COLORS.PRIMARY_CONTR_TEXT : COLORS.SECONDARY_DARK}
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', marginLeft: '5px' } }}
                >
                  FoodOrder
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Navigation handleModal={handleModal} />
            </Box>
            <ThemeSwitcher></ThemeSwitcher>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </header>
  );
}
