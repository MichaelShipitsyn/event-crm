import {
  CardContent,
  Container,
} from '@material-ui/core';
import { Page } from 'components/Page';
import styled from "styled-components";

export const StyledPage = styled(Page)(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.dark,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }
  )
);

export const StyledCardContainer = styled(Container)({
  maxWidth: '500px',
  paddingBottom: 80,
  paddingTop: 80,
});

export const StyledCardContent = styled(CardContent)(
  ({ theme }) => (
    {
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      minHeight: 400,
    }
  )
);