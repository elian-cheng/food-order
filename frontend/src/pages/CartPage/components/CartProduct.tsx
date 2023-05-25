import Image from 'mui-image';
import { Grid, Box, Button, Paper, Typography } from '@mui/material';
import { addItemToCart, ICartItem, removeItemFromCart } from '../../../store/redux/cartSlice';
import { useAppDispatch } from '../../../hooks/redux';

export enum ProductDetailsLabels {
  Description = 'Description',
  Category = 'Category',
  Currency = '$',
}

const CartProduct = (props: ICartItem) => {
  const dispatch = useAppDispatch();

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id: props.id,
        title: props.title,
        price: props.price,
        totalPrice: props.price,
        quantity: 1,
        image: props.image,
      })
    );
  };

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(props.id));
  };

  return (
    <Paper
      elevation={5}
      sx={{
        mb: 2,
        p: 2,
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        mb={2}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Grid item xs={12} md={3}>
          <Image src={`${props.image}`} alt={`${props.title}`} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'center', justifyItems: 'center' }}>
          <Typography variant="h6" component="h2" mb={1}>
            {props.title}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ mt: { xs: 3 } }}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}
          >
            <Button onClick={addToCartHandler}>+</Button>
            <Box>{props.quantity}</Box>
            <Button onClick={removeItemHandler}>-</Button>
          </Box>
          <Box>
            {ProductDetailsLabels.Currency}
            {props.quantity && props.quantity * props.price}.00
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartProduct;
