import { Grid } from '@mui/material';
import React from 'react';
import { IOrder } from '../../../../store/redux/orderSlice';
import OrderCard from '../OrderCard/OrderCard';

export interface IOrdersList {
  orders: IOrder[];
}

const OrdersList: React.FC<IOrdersList> = ({ orders }) => {
  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <React.Fragment key={order._id}>
          <OrderCard order={order} />
        </React.Fragment>
      ))}
    </Grid>
  );
};
export default OrdersList;
