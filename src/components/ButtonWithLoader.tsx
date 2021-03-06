import React from 'react';
import type { FC } from 'react';
import {
  Button,
  CircularProgress,
  makeStyles,
  ButtonProps
} from '@material-ui/core';

type ButtonLoaderWrapProps = {
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
      marginLeft: -10
    },
    invisible: {
      opacity: 0
    }
  };
});

export const ButtonWithLoader: FC<ButtonLoaderWrapProps> = ({
  label,
  isLoading,
  disabled,
  ...rest
}) => {
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
