import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import HomePage from '../../pages/HomePage/HomePage';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../store/context/authContext';

const CartPage = React.lazy(() => import('../../pages/CartPage/CartPage'));
const OrdersPage = React.lazy(() => import('../../pages/OrdersPage/OrdersPage'));
const ErrorPage = React.lazy(() => import('../../pages/ErrorPage/ErrorPage'));

export default function Router() {
  const { user } = useAuth();

  return (
    <>
      <Suspense
        fallback={
          <div className="centered">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/:productId" element={<ProductPage />} /> */}
            {user && <Route path="/orders" element={<OrdersPage />} />}
            {user && <Route path="/cart" element={<CartPage />} />}
            {user && <Route path="/auth" element={<Navigate to="/" replace />} />}
            {!user && <Route path="/orders" element={<Navigate to="/" replace />} />}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
