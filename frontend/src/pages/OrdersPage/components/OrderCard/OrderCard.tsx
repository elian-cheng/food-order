import { Grid, Paper, Box, Typography } from '@mui/material';
import { ProductDetailsLabels } from '../../../../pages/CartPage/components/CartProduct';
import { IOrder } from 'store/redux/orderSlice';
import Image from 'mui-image';

export interface IOrderProps {
  order: IOrder;
}

export const convertDate = (date: string, monthOptions?: Intl.DateTimeFormatOptions) => {
  const month = new Date(date).toLocaleString('en-US', monthOptions);
  const day = new Date(date).toLocaleString('en-US', { day: '2-digit' });
  const year = new Date(date).getFullYear();
  return { month, day, year };
};

const OrderCard: React.FC<IOrderProps> = ({ order }) => {
  const { date, products, shop, totalAmount, userData, _id } = order;
  const convertedDate = convertDate(date, { month: 'long' });
  const dateView = `${convertedDate.month.slice(0, 3)} ${convertedDate.day}, ${convertedDate.year}`;

  return (
    <>
      <Grid item key={_id} xs={12} md={6} lg={4}>
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
          <Paper
            elevation={5}
            sx={{
              mb: 2,
              p: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                m: '3rem auto',
                p: '1rem',
                borderRadius: '6px',
                width: '95%',
                maxWidth: '35rem',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
                // backgroundColor: `${isDark ? COLORS.PRIMARY_MAIN : COLORS.PRIMARY_LIGHT}`,
              }}
            >
              <Box>Order ID: {_id}</Box>
              <Box>Date: {dateView}</Box>
              <Box>User Name: {userData.name}</Box>
              <Box>User Phone: {userData.phone}</Box>
              <Box>User Address: {userData.address}</Box>
              <Box sx={{ textTransform: 'capitalize' }}>Shop: {shop}</Box>
              <Box>
                Order Total:
                {ProductDetailsLabels.Currency}
                {totalAmount}
              </Box>
            </Box>
          </Paper>
          {products.map((product) => (
            <Paper
              elevation={5}
              sx={{
                mb: 2,
                p: 2,
                overflow: 'hidden',
              }}
              key={product.id}
            >
              <Grid
                container
                mb={2}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Grid item xs={12} md={3}>
                  <Image src={`${product.image}`} alt={`${product.image}`} />
                </Grid>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center', justifyItems: 'center' }}>
                  <Typography variant="h6" component="h3" mb={1}>
                    {product.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box>{product.quantity}pcs</Box>
                    <Box>
                      {ProductDetailsLabels.Currency}
                      {product.quantity && (product.quantity * product.price).toFixed(2)}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Paper>
      </Grid>
    </>
  );
};
export default OrderCard;
