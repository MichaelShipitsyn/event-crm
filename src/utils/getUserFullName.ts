import { User } from 'types/user';

export const getUserFullName = (user: User): string => {
  return `${user.firstname} ${user.lastname}`;
};
