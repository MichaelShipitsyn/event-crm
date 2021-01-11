import React, { useRef, useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { logoutUser } from 'store/auth/thunks';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFullName } from 'store/auth/selector';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

export const Account: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setOpen] = useState<boolean>(false);
  const userFullName = useSelector(getUserFullName);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        // @ts-ignore
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={user?.avatar || ''}
        />
        <Hidden smDown>
          <Typography variant="h6" color="inherit">
            {userFullName}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem component={RouterLink} to="/app/social/profile">
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/app/account">
          Account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
