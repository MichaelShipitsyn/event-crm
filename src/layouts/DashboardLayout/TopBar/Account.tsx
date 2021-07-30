import {
  Box,
  ButtonBase,
  Hidden,
  MenuItem,
  Typography,
} from '@material-ui/core';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { RootState } from 'store';
import { getUserFullName } from 'store/auth/selector';
import { logoutUser } from 'store/auth/thunks';

import { StyledAvatar, StyledMenu } from './styled';

export const Account: FC = () => {
  const dispatch = useDispatch();
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
        // @ts-expect-error
        ref={ref}
      >
        <StyledAvatar alt="User" src={user?.avatar ?? ''} />
        <Hidden smDown>
          <Typography variant="h6" color="inherit">
            {userFullName}
          </Typography>
        </Hidden>
      </Box>
      <StyledMenu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
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
      </StyledMenu>
    </>
  );
};
