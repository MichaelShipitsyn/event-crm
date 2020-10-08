export const getErrorMessage = (error) => {
  return (
    error.response?.data.message ??
    'Ошибка сервера. Свяжитесь с администрацией сайта'
  );
};
