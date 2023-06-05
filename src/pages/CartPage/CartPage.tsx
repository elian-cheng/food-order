import { Box, Grid, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import CartProduct from './components/CartProduct';
import CartSummary from './components/CartSummary';

const CartPage = () => {
  const { cartItems, totalAmount, totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <>
      {!cartItems.length ? (
        <Typography component="h2" variant="h4" sx={{ mt: '5rem' }}>
          The cart is empty. Add some items =)
        </Typography>
      ) : (
        <Paper
          elevation={5}
          sx={{
            my: 3,
            p: 2,
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: '1rem' }}>Cart Items</Box>
              {cartItems.map((item) => {
                return <CartProduct key={item.id} {...item} />;
              })}
            </Grid>
            <Grid item xs={12} md={4}>
              <CartSummary
                totalAmount={totalAmount ? totalAmount : 0}
                totalQuantity={totalQuantity ? totalQuantity : 0}
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};
export default CartPage;
