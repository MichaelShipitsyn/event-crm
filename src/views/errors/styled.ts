import { Page } from 'components/Page';
import styled from "styled-components";

export const StyledPage = styled(Page)(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(3),
      paddingTop: 80,
      paddingBottom: 80,
    }
  )
);

export const StyledNotFoundImage = styled('img')({
  maxWidth: '100%',
  width: 560,
  maxHeight: 300,
  height: 'auto',
});