import {
  Avatar,
  IconButton,
  TableCell,
  TableContainer,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledTableContainer = styled(TableContainer)({
  maxHeight: '50vh',
});

export const StyledTableCell = styled(TableCell)({
  position: 'sticky',
  right: 0,
  background: '#fff',
});

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: 42,
  width: 42,
  marginRight: theme.spacing(1),
}));

export const StyledIconButton = styled(IconButton)({
  border: '1px solid rgba(84, 110, 122, 0.3)',
  padding: '5px',
  '&:hover': {
    backgroundColor: 'rgba(84, 110, 122, 0.15)',
  },
});

export const StyledQueryField = styled(TextField)({
  width: 300,
});
