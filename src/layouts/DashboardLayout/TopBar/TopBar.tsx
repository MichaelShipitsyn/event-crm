import {
  Box,
  Hidden,
  IconButton,
  SvgIcon,
} from '@material-ui/core';
import { Logo } from 'components/Logo';
import type { FC } from 'react';
import React from 'react';
import { Menu as MenuIcon } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';

import { Account } from './Account';
import { Search } from './Search';
import { StyledAppBar, StyledToolbar } from './styled'

interface TopBarProps {
  onMobileNavOpen?: () => void;
}

export const TopBar: FC<TopBarProps> = ({
  onMobileNavOpen,
  ...rest
}) => {
  return (
    <StyledAppBar {...rest}>
      <StyledToolbar>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        <Search />
        <Box ml={2}>
          <Account />
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};
