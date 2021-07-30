import { colors } from '@material-ui/core';

export const MuiInputBase = {
  root: {
    fontSize: '14px',
    lineHeight: '1.5em',
  },
  input: {
    '&::placeholder': {
      opacity: 1,
      color: colors.blueGrey[600],
    },
    boxSizing: 'border-box',
    height: '35px',
  },
};
