import { Page } from 'components/Page';
import styled from "styled-components";

export const StyledPage = styled(Page)(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    }
  )
);

export const StyledDrawerContent = styled('div')({
  overflowY: 'auto',
  height: '100%',
});