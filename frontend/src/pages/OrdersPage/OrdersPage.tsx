import { useCallback, useEffect } from 'react';
import { useAuth } from '../../store/context/authContext';
import { getOrders } from '../../store/redux/orderSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Loader from '../../components/Loader/Loader';
import { Box, Typography } from '@mui/material';
import OrdersList from './components/OrdersList/OrdersList';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { orders, isLoading } = useAppSelector((state) => state.orders);

  const getUserOrders = useCallback(
    (user: string) => {
      if (!user) {
        return;
      }
      dispatch(getOrders(user));
    },
    [dispatch]
  );

  useEffect(() => {
    getUserOrders(user!);
  }, [getUserOrders, dispatch, user]);

  const renderContent = () => {
    return isLoading ? (
      <Loader />
    ) : (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          my: '2rem',
        }}
      >
        <OrdersList orders={orders} />
      </Box>
    );
  };

  return (
    <>
      {!orders.length ? (
        <Typography component="h2" variant="h4" sx={{ mt: '5rem' }}>
          There are no orders yet. Please place an order in the shopping cart first.
        </Typography>
      ) : (
        renderContent()
      )}
    </>
  );
};

export default OrdersPage;
