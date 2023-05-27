import { Alert, Box, List, ListItem, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setShop } from '../../../../store/redux/catalogSlice';

const SHOPSLIST = ['burgerville', 'shawarmany', 'pizzato'];

const ShopsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const savedShop = useAppSelector((state) => state.catalog.shop);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const closeSnackbarHandler = () => {
    setSnackbarOpen(false);
  };

  const handleClick = (shop: string) => {
    if (cartItems.length) {
      setSnackbarOpen(true);
    } else {
      dispatch(setShop(shop));
    }
  };

  return (
    <Box sx={{ width: 280 }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gridGap: '2rem',
          justifyContent: 'flex-start',
        }}
      >
        {SHOPSLIST.map((shop, index) => (
          <ListItem
            key={index}
            sx={{
              color: 'white',
              border: '1px solid transparent',
              backgroundColor: savedShop === shop ? '#39527c' : 'grey',
              padding: 5,
              width: 200,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              cursor: 'pointer',
              transition: 'all 0.3s ease 0s',
              '&:hover, &:focus': {
                border: '2px solid cyan',
                cursor: 'pointer',
                boxShadow:
                  '0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.12)',
              },
            }}
            onClick={() => handleClick(shop)}
          >
            <Typography variant="body1" textTransform="capitalize">
              {shop}
            </Typography>
          </ListItem>
        ))}
      </List>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={closeSnackbarHandler}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbarHandler} severity="error" sx={{ width: '100%' }}>
            Cannot order from multiple shops at once. Delete cart items first.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ShopsList;
