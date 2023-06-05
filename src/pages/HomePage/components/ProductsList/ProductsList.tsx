import { IProduct } from 'store/redux/catalogSlice';
import ProductCard from '../ProductCard/ProductCard';
import { Grid } from '@mui/material';

export interface IProductsList {
  products: IProduct[];
}

const ProductsList: React.FC<IProductsList> = ({ products }) => {
  return (
    <Grid container spacing={{ xs: 2 }} sx={{ justifyContent: 'center' }}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
};

export default ProductsList;
