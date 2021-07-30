import { createStyles, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { Theme } from 'theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
      '.actionButton': {
        height: '26px',
        fontSize: '13px',
      },
      '.deleteButton': {
        backgroundColor: '#ee5454',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#e92626',
        },
      },
      '.navItemActive': {
        color: theme.palette.secondary.main,
        '& $title': {
          fontWeight: theme.typography.fontWeightMedium,
        },
        '& $icon': {
          color: theme.palette.secondary.main,
        },
      },
    },
  })
);

export const GlobalStyles: FC = () => {
  useStyles();

  return null;
};
