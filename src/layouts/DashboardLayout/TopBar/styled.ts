import { AppBar, Avatar, Menu,Toolbar } from '@material-ui/core';
import styled from "styled-components";

export const StyledAppBar = styled(AppBar)(
  ({ theme }) => (
    {
      zIndex: theme.zIndex.drawer + 100,
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main,
    }
  )
);

export const StyledToolbar = styled(Toolbar)({
  '&&': {
    minHeight: 44,
  }
});

export const StyledAvatar = styled(Avatar)(
  ({ theme }) => (
    {
      '&&': {
        height: 32,
        width: 32,
        marginRight: theme.spacing(1),
      }
    }
  )
);

export const StyledMenu = styled(Menu)({
  '& .MuiList-root': {
    width: 200,
  },
});