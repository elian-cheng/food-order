import styles from './ProductCard.module.scss';
import { IProduct } from '../../../../store/redux/catalogSlice';
import { useState } from 'react';

export interface IProductProps {
  product: IProduct;
}

const ProductCard: React.FC<IProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 0) {
      return;
    }
    setQuantity(+e.target.value);
  };

  return (
    <li className={styles.wrapper}>
      <img
        className={styles.img}
        src={product.image}
        alt={`${product.title}`}
        width="281"
        height="192"
      />
      <div className={styles.infoWrapper}>
        <p className={styles.name}>{product.title}</p>
        <div className={styles.descWrapper}>
          <input
            type="number"
            name="quantity"
            min="1"
            max="25"
            step="1"
            value={quantity}
            className={styles.input}
            onChange={handleInputChange}
          />
          <button className={styles.button}>Add to cart</button>
        </div>
      </div>
    </li>
  );
};
export default ProductCard;
