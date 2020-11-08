import { User } from 'types/users';

export const getUserFullName = (user: User): string => {
  return `${user.firstname} ${user.lastname}`;
};
