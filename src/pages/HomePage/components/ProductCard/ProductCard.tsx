import { IProduct } from '../../../../store/redux/catalogSlice';
import * as Icons from '@mui/icons-material';
import { Grid, Paper, Box, Typography, Button, Container, Snackbar, Alert } from '@mui/material';
import { ProductDetailsLabels } from '../../../../pages/CartPage/components/CartProduct';
import { useAppDispatch } from '../../../../hooks/redux';
import { addItemToCart } from '../../../../store/redux/cartSlice';
import { useAuth } from '../../../../store/context/authContext';
import { useState } from 'react';

export interface IProductProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductProps> = ({ product }) => {
  const { title, price, id, image, shop } = product;
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const closeSnackbarHandler = () => {
    setSnackbarOpen(false);
  };

  const addToCartHandler = () => {
    if (!user) {
      setSnackbarOpen(true);
      return;
    }
    dispatch(
      addItemToCart({
        id,
        title,
        price,
        shop,
        totalPrice: price,
        quantity: 1,
        image,
      })
    );
  };

  return (
    <>
      <Grid item key={product.id} xs={7} md={5} lg={3} sx={{ minWidth: '295px' }}>
        <Paper
          elevation={5}
          sx={{
            '&:hover': {
              boxShadow: 8,
            },
            mb: 2,
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <Box
            m={1}
            borderRadius={1}
            sx={{
              height: 180,
              backgroundImage: 'url(' + product.image + ')',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography component="h2" variant="h5" sx={{ my: '.5rem' }}>
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" sx={{ p: 1 }}>
              {ProductDetailsLabels.Currency} {product.price.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Icons.ShoppingCart />}
              sx={{ verticalAlign: 'middle', color: 'white' }}
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </Box>
        </Paper>
      </Grid>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={closeSnackbarHandler}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbarHandler} severity="error" sx={{ width: '100%' }}>
            You need to be registered to make an order. Please login
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
export default ProductCard;
