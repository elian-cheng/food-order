import { useAppSelector } from '../../hooks/redux';
import React from 'react';
import { addOrder } from '../../store/redux/orderSlice';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import { Typography } from '@mui/material';

const CheckoutPage: React.FC = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <>
      {!cartItems.length ? (
        <Typography component="h2" variant="h4" sx={{ mt: '5rem' }}>
          The cart is empty. Add some items, then you can make an order!
        </Typography>
      ) : (
        <div className="orders__form-wrapper">
          <CheckoutForm />
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
