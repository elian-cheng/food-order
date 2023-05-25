import { IProduct } from 'store/redux/catalogSlice';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

export interface IProductsList {
  products: IProduct[];
}

const ProductsList: React.FC<IProductsList> = ({ products }) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
