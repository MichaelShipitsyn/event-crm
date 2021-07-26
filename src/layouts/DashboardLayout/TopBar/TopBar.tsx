import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  makeStyles,
  SvgIcon,
  Toolbar,
} from '@material-ui/core';
import clsx from 'clsx';
import { Logo } from 'components/Logo';
import type { FC } from 'react';
import React from 'react';
import { Menu as MenuIcon } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';
import type { Theme } from 'theme';

import { Account } from './Account';
import { Search } from './Search';

interface TopBarProps {
  className?: string;
  onMobileNavOpen?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
  },
  toolbar: {
    minHeight: 44,
  },
}));

export const TopBar: FC<TopBarProps> = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
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
      </Toolbar>
    </AppBar>
  );
};
