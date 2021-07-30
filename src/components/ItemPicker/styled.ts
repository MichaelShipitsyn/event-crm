import {
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledIconButton = styled(IconButton)({
  border: '1px solid rgba(84, 110, 122, 0.3)',
  width: '24px',
  height: '24px',
  padding: '5px',
});

export const StyledCheckedIcon = styled(StyledIconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledListWrap = styled('div')({
  maxHeight: '300px',
  overflow: 'auto',
});

export const StyledList = styled(List)({
  paddingTop: 0,
  paddingBottom: 0,
  border: '1px solid #e8e8e8',
  borderRadius: '0 0 3px 3px',
});

export const StyledListItem = styled(ListItem)({
  borderBottom: '1px solid #e8e8e8',
  padding: '12px 14px',
});

export const StyledDialogActions = styled(DialogActions)({
  padding: '16px 24px 8px',
});

export const StyledItemSecondaryAction = styled(ListItemSecondaryAction)({
  pointerEvents: 'none',
});

export const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const StyledCloseButton = styled(IconButton)({
  position: 'relative',
  right: '-4px',
});
