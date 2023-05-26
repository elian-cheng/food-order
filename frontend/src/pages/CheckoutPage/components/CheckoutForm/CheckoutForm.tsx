import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useThemeSwitcher } from '../../../../store/context/themeContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import COLORS from '../../../../theme/colors';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { useAuth } from '../../../../store/context/authContext';
import { sendOrder } from '../../../../store/redux/orderSlice';
import { replaceCart } from '../../../../store/redux/cartSlice';

export interface IFormData {
  name: string;
  phone: string;
  address: string;
}

const CheckoutForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { cartItems, totalAmount } = useAppSelector((state) => state.cart);
  const { shop } = useAppSelector((state) => state.catalog);
  const { directions } = useAppSelector((state) => state.map);
  const { isLoading } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();
  const { isDark } = useThemeSwitcher();

  useEffect(() => {
    if (!directions) return;
    const valueInp = document.querySelector('#address') as HTMLInputElement;
    valueInp.value = directions;
  }, [directions]);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(5, 'Name is too short - should be 5 chars minimum.')
      .required('Name is a required field'),
    phone: yup
      .string()
      .matches(/^\d{10,}$/, 'Phone number should be 10 digits.')
      .required('Phone is a required field'),
    address: yup
      .string()
      .min(10, 'Address is too short - should be 10 chars minimum.')
      .required('No address provided.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const { name, phone, address } = data;

    try {
      const orderData = {
        shop: shop,
        userId: user!,
        userData: {
          name,
          phone,
          address,
        },
        products: cartItems,
        totalAmount,
        date: new Date().toString(),
      };
      dispatch(sendOrder({ id: user!, body: orderData }));
      dispatch(replaceCart());
      navigate('/', { replace: true });
    } catch (err: unknown) {
      const error = err as Error;
      alert(error.message);
    }
  };

  return (
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
        boxShadow: ' 0 1px 4px rgba(0, 0, 0, 0.2)',
        backgroundColor: `${isDark ? COLORS.PRIMARY_MAIN : COLORS.PRIMARY_LIGHT}`,
      }}
    >
      <Typography component="h2" variant="h4" sx={{ my: '.5rem' }}>
        Order
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Your full name</FormLabel>
        <TextField
          {...register('name')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          // label="Name"
          name="name"
          type="name"
          autoComplete="name"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <FormLabel>Phone number</FormLabel>
        <TextField
          {...register('phone')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="phone"
          // label="Phone"
          type="string"
          id="phone"
          autoComplete="current-phone"
          error={!!errors.phone}
          helperText={errors?.phone?.message}
        />
        <FormLabel>Delivery address</FormLabel>
        <TextField
          {...register('address')}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="address"
          // label="Address"
          type="text"
          id="address"
          autoComplete="current-address"
          error={!!errors.address}
          helperText={errors?.address?.message}
        />

        {!isLoading && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: '.8rem',
              backgroundColor: `${isDark ? COLORS.SECONDARY_DARK : COLORS.SECONDARY_DARK}`,
              color: 'white',
            }}
          >
            Submit
          </Button>
        )}
        {isLoading && <p>Sending request...</p>}
      </form>
    </Box>
  );
};

export default CheckoutForm;
