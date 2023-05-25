import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './Footer.module.scss';
import Colors from '../../theme/colors';
import { Box, Typography } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { useThemeSwitcher } from '../../store/context/themeContext';

export default function Footer() {
  const { isDark } = useThemeSwitcher();

  return (
    <Box
      sx={{
        borderTop: `${Colors.SECONDARY_MAIN} 1px solid`,
      }}
      component="footer"
      className={classes.footer}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <NavLink
          to="/"
          className={classes['logo-link']}
          style={{ width: '150px', filter: 'invert' }}
        >
          FoodOrder
        </NavLink>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          className={classes['team-members-wrap']}
          color={isDark ? Colors.PRIMARY_CONTR_TEXT : Colors.SECONDARY_DARK}
        >
          <Box
            sx={{ display: 'flex', width: '100%', alignItems: 'center' }}
            className={classes['team-members-hold']}
          >
            <Box sx={{ paddingTop: '8px', paddingRight: '30px' }}>
              <Link
                to="https://github.com/elian-cheng"
                target="_blank"
                style={{ display: 'inline-flex' }}
              >
                <GitHub />
                <Typography variant="body1" component="span" sx={{ paddingLeft: '15px' }}>
                  Elian-cheng
                </Typography>
              </Link>
            </Box>
            <Typography
              component="span"
              variant="body1"
              marginLeft="30px"
              paddingBottom="3px"
              className={classes.year}
            >
              2023©
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
