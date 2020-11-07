import palette from '../palette';

console.log(palette)

export default {
  root: {
    fontSize: '12px',
    fontWeight: '500',
    color: palette.text.primary,
    '&.Mui-error': {
      color: palette.text.primary
    }
  }
};
