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
            <Typography sx={{ verticalAlign: 'middle' }} component={'span'}>
              Home
            </Typography>
          </NavLink>
        </MenuItem>
        {user ? (
          <>
            <MenuItem>
              <NavLink to="/orders">
                <Typography sx={{ verticalAlign: 'middle' }} component={'span'}>
                  Orders
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <Button onClick={logoutHandler} endIcon={<Icons.Logout />}>
                Logout
              </Button>
            </MenuItem>
            <MenuItem>
              <NavLink to="/cart">
                <Badge badgeContent={totalQuantity}>
                  <Icons.ShoppingCart sx={{ verticalAlign: 'middle', mr: '.5rem' }} />
                </Badge>
              </NavLink>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Button onClick={handleModal} endIcon={<Icons.Login />}>
              Login
            </Button>
          </MenuItem>
        )}
      </List>
    </nav>
  );
};
export default Navigation;
