import { Page } from 'components/Page';
import styled from 'styled-components';

export const StyledPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const StyledDrawerContent = styled('div')({
  overflowY: 'auto',
  height: '100%',
});

export const StyledNameClientLabel = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const StyledSelectClientButton = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '14px',
  textDecoration: 'underline',
  cursor: 'pointer',
}));
