import { Box, Button, Input, Paper, Grid } from '@mui/material';
import { useAppDispatch } from '../../../hooks/redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { replaceCart } from '../../../store/redux/cartSlice';
import { ProductDetailsLabels } from './CartProduct';

export interface ISummaryCart {
  totalAmount: number;
  totalQuantity: number;
}

const promoToTest = ['PROMO1', 'PROMO2', 'PROMO3'];
const discountKeyToStore = 'discountAmount';

const CartSummary = (props: ISummaryCart) => {
  const dispatch = useAppDispatch();
  const [isPromo, setIsPromo] = useState<boolean[]>(promoToTest.map(() => false));
  const [implementedDiscount, setImplementedDiscount] = useState<string[]>(
    (localStorage.getItem(discountKeyToStore || '{}') &&
      JSON.parse(localStorage?.getItem(discountKeyToStore || '{}') || '')) ||
      []
  );
  const [inputValue, setInputValue] = useState<string>('');
  const falsePromoArr = promoToTest.map(() => false);
  const discountItemIndex = isPromo.indexOf(true);
  const tempImplementedDiscount = [...implementedDiscount];

  const clearCartHandler = () => {
    dispatch(replaceCart());
  };

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const promoCode = event.target.value;
    const indexOfPromoCode = promoToTest.indexOf(promoCode);
    if (indexOfPromoCode > -1) {
      const tempPromoArr = [...isPromo];
      tempPromoArr[indexOfPromoCode] = true;
      setIsPromo(tempPromoArr);
    } else setIsPromo(falsePromoArr);
    setInputValue(promoCode);
  }

  function onClickHandler() {
    if (tempImplementedDiscount.indexOf(promoToTest[discountItemIndex]) === -1) {
      tempImplementedDiscount.push(promoToTest[discountItemIndex]);
    }
    localStorage.setItem(discountKeyToStore, JSON.stringify(tempImplementedDiscount));
    window.dispatchEvent(new Event('discountSet'));
    setInputValue('');
    setIsPromo(falsePromoArr);
  }

  window.addEventListener('discountSet', () => {
    setImplementedDiscount(tempImplementedDiscount);
  });

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const clickedButton = event.target as HTMLImageElement;
    const indexOfClickedButton = tempImplementedDiscount.indexOf(clickedButton.name);
    tempImplementedDiscount.splice(indexOfClickedButton, 1);
    localStorage.setItem(
      discountKeyToStore,
      JSON.stringify(tempImplementedDiscount[0] ? tempImplementedDiscount : [])
    );
    window.dispatchEvent(new Event('discountSet'));
  };

  const isPromoFunc = (props: boolean[]) => {
    return props.map((item, index) => {
      if (item) {
        return (
          <Box key={index}>
            {promoToTest[index]} -10%
            <Button onClick={onClickHandler}>Add</Button>
          </Box>
        );
      }
    });
  };

  const implementedDiscountFunc = (discountArr: string[]) => {
    if (!discountArr[0]) {
      return (
        <Box>
          Total {ProductDetailsLabels.Currency}: {props.totalAmount.toFixed(2)}
        </Box>
      );
    }
    return (
      <Box>
        <Box sx={{ textDecoration: 'line-through' }}>
          Total {ProductDetailsLabels.Currency}: {props.totalAmount}
        </Box>
        <Box>
          Total {ProductDetailsLabels.Currency}:{' '}
          {Math.ceil(props.totalAmount / (1 + 0.1 * discountArr.length))}
        </Box>
        {discountArr.map((item, index) => {
          return (
            <Box key={index}>
              {item} is applied
              <Button onClick={removeHandler} name={item}>
                Remove
              </Button>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Paper
      elevation={5}
      sx={{
        mb: 2,
        p: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>Summary</Box>
        <Box>Products: {props.totalQuantity}</Box>
        <Box>{implementedDiscountFunc(implementedDiscount)}</Box>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item>PromoCode</Grid>
          <Grid item>
            <Input size="small" type="string" onChange={onChangeHandler} value={inputValue} />
          </Grid>
        </Grid>
        <Box>
          Promo to test:
          {promoToTest.map((item, index) => (
            <Box key={index}>{item}</Box>
          ))}
          {isPromoFunc(isPromo)}
        </Box>
        <Button
          variant="contained"
          sx={{
            mt: '1rem',
            color: 'white',
          }}
        >
          <NavLink to="/checkout">Order Now</NavLink>
        </Button>
        <Button
          variant="contained"
          sx={{
            mt: '1rem',
            color: 'white',
            backgroundColor: '#39527c',
          }}
          onClick={clearCartHandler}
        >
          Clear cart
        </Button>
      </Box>
    </Paper>
  );
};

export default CartSummary;
