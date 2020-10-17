export const getErrorMessage = (error) => {
  if(!error.response || error.response.status === 500) {
    return 'Ошибка сервера. Свяжитесь с администрацией сайта';
  }

  return error.response.data.message;
};
