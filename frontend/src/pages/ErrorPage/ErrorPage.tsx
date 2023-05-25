import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export default function ErrorPage() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '80%',
        alignItems: 'center',
        my: '2rem',
      }}
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="h3" align="center">
        Page does not exist
      </Typography>
      <NavLink to="/">
        <Button
          variant="contained"
          sx={{
            mt: '1rem',
          }}
        >
          Return Home
        </Button>
      </NavLink>
    </Container>
  );
}
