const SHOPSLIST = ['burgerville', 'shawarmany', 'pizzato'];
import { useAppDispatch } from '../../../../hooks/redux';
import styles from './ShopsList.module.scss';
import { setShop } from '../../../../store/redux/catalogSlice';

const ShopsList: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {SHOPSLIST.map((shop, index) => (
          <li
            key={index}
            className={styles.listItem}
            // onClick={() => {
            //   !cartItems.length
            //     ? dispatch(setShop(shop))
            //     : alert('Cant order from different shop. Delete cart items first');
            // }}
            onClick={() => {
              dispatch(setShop(shop));
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
