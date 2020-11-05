export const getUserFullName = (state) => {
  return `${state.auth.user.firstname} ${state.auth.user.lastname}`;
};
