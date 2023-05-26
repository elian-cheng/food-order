import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import React, { useEffect, FC, useCallback } from 'react';
import { getProducts } from '../../store/redux/catalogSlice';
import ShopsList from './components/ShopsList/ShopsList';
import ProductsList from './components/ProductsList/ProductsList';
import { Box } from '@mui/material';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { shop, isLoading, isError, products } = useAppSelector((state) => state.catalog);

  const renderCatalog = useCallback(
    (shop: string) => {
      dispatch(getProducts(shop));
    },
    [dispatch]
  );

  useEffect(() => {
    renderCatalog(shop);
  }, [renderCatalog, dispatch, shop]);

  const renderContent = () => {
    if (isError) {
      return (
        <p className="notification-message">
          Something went wrong... Check your internet connection.
        </p>
      );
    }
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
        <ShopsList />
        <ProductsList products={products} />
      </Box>
    );
  };

  return <>{renderContent()}</>;
};

export default HomePage;
