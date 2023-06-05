import { List, Typography, MenuItem, Button, Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../store/context/authContext';
import * as Icons from '@mui/icons-material';
import { MouseEventHandler } from 'react';
import { useAppSelector } from '../../../../hooks/redux';

interface INavigation {
  handleModal: MouseEventHandler<HTMLElement>;
}

const Navigation: React.FC<INavigation> = ({ handleModal }) => {
  const { user, setUser } = useAuth();
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const logoutHandler = () => {
    localStorage.removeItem('userData');
    setUser(null);
    location.reload();
  };

  return (
    <nav>
      <List
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MenuItem>
          <NavLink to="/">
            <Typography sx={{ verticalAlign: 'middle', fontWeight: '500' }} component={'span'}>
              Home
            </Typography>
          </NavLink>
        </MenuItem>
        {user ? (
          <>
            <MenuItem>
              <NavLink to="/orders">
                <Typography sx={{ verticalAlign: 'middle', fontWeight: '500' }} component={'span'}>
                  Orders
                </Typography>
              </NavLink>
            </MenuItem>
            <Button
              onClick={logoutHandler}
              endIcon={<Icons.Logout />}
              sx={{ textTransform: 'capitalize', fontSize: '1rem', px: '.7rem' }}
            >
              Logout
            </Button>
            <MenuItem>
              <NavLink to="/cart">
                <Badge badgeContent={totalQuantity} color="primary">
                  <Icons.ShoppingCart sx={{ verticalAlign: 'middle', mr: '.5rem' }} />
                </Badge>
              </NavLink>
            </MenuItem>
          </>
        ) : (
          <Button
            onClick={handleModal}
            endIcon={<Icons.Login />}
            sx={{ textTransform: 'capitalize', fontSize: '1rem', px: '.7rem', mr: '1rem' }}
          >
            Login
          </Button>
        )}
      </List>
    </nav>
  );
};
export default Navigation;
