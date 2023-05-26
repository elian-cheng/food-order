const SHOPSLIST = ['burgerville', 'shawarmany', 'pizzato'];
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import styles from './ShopsList.module.scss';
import { setShop } from '../../../../store/redux/catalogSlice';

const ShopsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const savedShop = useAppSelector((state) => state.catalog.shop);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {SHOPSLIST.map((shop, index) => (
          <li
            key={index}
            className={savedShop === shop ? `${styles.listItem} activeShop` : styles.listItem}
            onClick={() => {
              cartItems.length
                ? alert('Cant order from multiple shops at once. Delete cart items first')
                : dispatch(setShop(shop));
            }}
          >
            <p className={styles.name}>{shop}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopsList;
