import { IProduct } from '../../../../store/redux/catalogSlice';
import * as Icons from '@mui/icons-material';
import { Grid, Paper, Box, Typography, Button, Container } from '@mui/material';
import { ProductDetailsLabels } from '../../../../pages/CartPage/components/CartProduct';
import { useAppDispatch } from '../../../../hooks/redux';
import { addItemToCart } from '../../../../store/redux/cartSlice';
import { useAuth } from '../../../../store/context/authContext';

export interface IProductProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductProps> = ({ product }) => {
  const { title, price, id, image } = product;
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const addToCartHandler = () => {
    if (!user) {
      alert('You need to be registered to make an order. Please login');
      return;
    }
    dispatch(
      addItemToCart({
        id,
        title,
        price,
        totalPrice: price,
        quantity: 1,
        image,
      })
    );
  };

  return (
    <Grid item key={product.id} xs={12} md={6} lg={4}>
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
          m={2}
          borderRadius={1}
          sx={{
            height: 150,
            backgroundImage: 'url(' + product.image + ')',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            boxShadow: 3,
          }}
        />
        <Container
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
            {ProductDetailsLabels.Currency} {product.price}.00
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
        </Container>
      </Paper>
    </Grid>
  );
};
export default ProductCard;
