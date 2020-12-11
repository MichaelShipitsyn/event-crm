export const getErrorMessage = (error: any) => {
  if (!error.response || error.response.status === 500) {
    return 'Ошибка сервера. Обратитесь к администрации';
  }

  return error.response.data.message;
};
