import {
  IconButton,
  TableCell,
  TableContainer,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledTextField = styled(TextField)({
  width: 300,
});

export const StyledTableContainer = styled(TableContainer)({
  maxHeight: '50vh',
});

export const StickyTableCell = styled(TableCell)({
  '& .MuiTableCell-root': {
    position: 'sticky',
    right: 0,
    background: '#fff',
  },
});

export const StyledIconButton = styled(IconButton)({
  border: '1px solid rgba(84, 110, 122, 0.3)',
  padding: '5px',
  '&:hover': {
    backgroundColor: 'rgba(84, 110, 122, 0.15)',
  },
});
