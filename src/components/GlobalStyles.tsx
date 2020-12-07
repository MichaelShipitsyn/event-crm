import { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        height: '100%',
        width: '100%'
      },
      '#root': {
        height: '100%',
        width: '100%'
      },
      '.actionButton': {
        height: '26px',
        fontSize: '13px'
      },
      '.deleteButton': {
        backgroundColor: '#ee5454',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#e92626'
        }
      }
    }
  })
);

export const GlobalStyles: FC = () => {
  useStyles();

  return null;
};
