export default {
  MuiTextField: {
    autoComplete: 'off',
    InputProps: {
      notched: false,
    },
    InputLabelProps: {
      shrink: true,
    },
  },
  MuiButtonBase: {
    disableRipple: true,
  },
  MuiDialog: {
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
  },
  MuiDrawer: {
    ModalProps: {
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
    },
  },
};
