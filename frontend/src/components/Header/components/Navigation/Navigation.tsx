import { List, Typography, MenuItem, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../store/context/authContext';
import * as Icons from '@mui/icons-material';
import { MouseEventHandler } from 'react';

interface INavigation {
  handleModal: MouseEventHandler<HTMLElement>;
}

const Navigation: React.FC<INavigation> = ({ handleModal }) => {
  const { user, setUser } = useAuth();
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
              <NavLink to="/cart">
                <Typography sx={{ verticalAlign: 'middle' }} component={'span'}>
                  Cart
                </Typography>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <Button onClick={logoutHandler}>
                Logout
                <Icons.Logout sx={{ verticalAlign: 'middle' }} />
              </Button>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Button onClick={handleModal}>
              Login
              <Icons.Login sx={{ verticalAlign: 'middle' }} />
            </Button>
          </MenuItem>
        )}
      </List>
    </nav>
  );
};
export default Navigation;
