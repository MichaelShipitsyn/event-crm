export const isRequestFulfilled = (status: string): boolean => {
  return status === 'success' || status === 'fail';
};
