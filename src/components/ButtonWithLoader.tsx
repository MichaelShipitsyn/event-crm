import {
  Button,
  ButtonProps,
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import styled from "styled-components";

type LabelProps = {
  isLoading: boolean;
}

export const Label = styled('span')<LabelProps>(({ isLoading }) => {
    return {
      opacity: isLoading ? 0 : 'initial',
    }
  }
);

export const StyledButtonProgress = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -10,
  marginLeft: -10,
});

type Props = {
  label: string;
  isLoading: boolean;
} & ButtonProps;

export const ButtonWithLoader = ({
  label,
  isLoading,
  disabled,
  ...rest
}: Props) => {
  return (
    <Button
      disabled={isLoading || disabled}
      {...rest}
    >
      <Label isLoading={isLoading}>{label}</Label>
      {isLoading && (
        <StyledButtonProgress
          size={20}
          color="inherit"
        />
      )}
    </Button>
  );
};
