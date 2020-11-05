import { colors } from '@material-ui/core';

export default {
  root: {
    fontSize: '14px'
  },
  input: {
    '&::placeholder': {
      opacity: 1,
      color: colors.blueGrey[600]
    },
    boxSizing: 'border-box',
    height: '35px'
  }
};
