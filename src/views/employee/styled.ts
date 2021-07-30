import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { Page } from 'components/Page';
import styled from 'styled-components';

export const StyledPage = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  display: 'flex',
  marginTop: '3px',
});

export const StyledToggleButton = styled(ToggleButton)({
  width: '50%',
});

export const StyledDrawerContent = styled('div')({
  overflowY: 'auto',
  height: '100%',
});
