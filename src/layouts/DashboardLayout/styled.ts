import styled from "styled-components";

export const Container = styled('div')(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.dark,
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
    }
  )
);

export const StyledWrapper = styled('div')(
  ({ theme }) => (
    {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 256,
      },
    }
  )
);

export const ContentContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
});

export const StyledContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
});