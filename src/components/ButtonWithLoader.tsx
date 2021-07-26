import {
  Button,
  ButtonProps,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import React from 'react';

type Props = {
  label: string;
  isLoading: boolean;
} & ButtonProps;

const useStyles = makeStyles(() => {
  return {
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -10,
      marginLeft: -10,
    },
    invisible: {
      opacity: 0,
    },
  };
});

export const ButtonWithLoader = ({
  label,
  isLoading,
  disabled,
  ...rest
}: Props) => {
  const classes = useStyles();

  return (
    <Button
      classes={
        isLoading
          ? { startIcon: classes.invisible, endIcon: classes.invisible }
          : {}
      }
      disabled={isLoading || disabled}
      {...rest}
    >
      <span className={isLoading ? classes.invisible : ''}>{label}</span>
      {isLoading && (
        <CircularProgress
          size={20}
          color="inherit"
          className={classes.buttonProgress}
        />
      )}
    </Button>
  );
};
