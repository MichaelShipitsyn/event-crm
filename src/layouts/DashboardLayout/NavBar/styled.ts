import { Button, Avatar, Drawer, List, ListItem } from '@material-ui/core';
import styled from "styled-components";

export const StyledMobileDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    width: 256,
  },
});

export const StyledDesktopDrawer = styled(Drawer)({
  '& .MuiPaper-root': {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
});

export const StyledAvatar = styled(Avatar)({
  '&&': {
    cursor: 'pointer',
    width: 64,
    height: 64,
  }
});

export const StyledList = styled(List)({
  '& .MuiButton-root': {
    height: '44px',
  },
});

export const StyledListItem = styled(ListItem)({
  '&&': {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  }
});

export const StyledButton = styled(Button)(
  ({ theme }) => (
    {
      color: theme.palette.text.secondary,
      padding: '10px 8px',
      justifyContent: 'flex-start',
      textTransform: 'none',
      letterSpacing: 0,
      width: '100%',
    }
  )
);

export const StyledButtonLeaf = styled(Button)({
  '&&': {
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  }
});

export const StyledTitle = styled('span')(
  ({ theme }) => (
    {
      marginLeft: theme.spacing(1),
      marginRight: 'auto',
    }
  )
);